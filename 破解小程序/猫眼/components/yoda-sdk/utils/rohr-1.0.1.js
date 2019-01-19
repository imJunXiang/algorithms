var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    function t(t) {
        for (var e = t.length; --e >= 0; ) t[e] = 0;
    }
    function e(t, e, a, n, r) {
        this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, 
        this.max_length = r, this.has_stree = t && t.length;
    }
    function a(t, e) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
    }
    function n(t) {
        return t < 256 ? Ut[t] : Ut[256 + (t >>> 7)];
    }
    function r(t, e) {
        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
    }
    function i(t, e, a) {
        t.bi_valid > kt - a ? (t.bi_buf |= e << t.bi_valid & 65535, r(t, t.bi_buf), t.bi_buf = e >> kt - t.bi_valid, 
        t.bi_valid += a - kt) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a);
    }
    function s(t, e, a) {
        i(t, a[2 * e], a[2 * e + 1]);
    }
    function h(t, e) {
        var a = 0;
        do {
            a |= 1 & t, t >>>= 1, a <<= 1;
        } while (--e > 0);
        return a >>> 1;
    }
    function o(t) {
        16 === t.bi_valid ? (r(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, 
        t.bi_buf >>= 8, t.bi_valid -= 8);
    }
    function l(t, e) {
        var a, n, r, i, s, h, o = e.dyn_tree, l = e.max_code, _ = e.stat_desc.static_tree, d = e.stat_desc.has_stree, u = e.stat_desc.extra_bits, f = e.stat_desc.extra_base, c = e.stat_desc.max_length, p = 0;
        for (i = 0; i <= yt; i++) t.bl_count[i] = 0;
        for (o[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; a < mt; a++) n = t.heap[a], 
        i = o[2 * o[2 * n + 1] + 1] + 1, i > c && (i = c, p++), o[2 * n + 1] = i, n > l || (t.bl_count[i]++, 
        s = 0, n >= f && (s = u[n - f]), h = o[2 * n], t.opt_len += h * (i + s), d && (t.static_len += h * (_[2 * n + 1] + s)));
        if (0 !== p) {
            do {
                for (i = c - 1; 0 === t.bl_count[i]; ) i--;
                t.bl_count[i]--, t.bl_count[i + 1] += 2, t.bl_count[c]--, p -= 2;
            } while (p > 0);
            for (i = c; 0 !== i; i--) for (n = t.bl_count[i]; 0 !== n; ) (r = t.heap[--a]) > l || (o[2 * r + 1] !== i && (t.opt_len += (i - o[2 * r + 1]) * o[2 * r], 
            o[2 * r + 1] = i), n--);
        }
    }
    function _(t, e, a) {
        var n, r, i = new Array(yt + 1), s = 0;
        for (n = 1; n <= yt; n++) i[n] = s = s + a[n - 1] << 1;
        for (r = 0; r <= e; r++) {
            var o = t[2 * r + 1];
            0 !== o && (t[2 * r] = h(i[o]++, o));
        }
    }
    function d() {
        var t, a, n, r, i, s = new Array(yt + 1);
        for (n = 0, r = 0; r < pt - 1; r++) for (Rt[r] = n, t = 0; t < 1 << Ct[r]; t++) Ot[n++] = r;
        for (Ot[n - 1] = r, i = 0, r = 0; r < 16; r++) for (Vt[r] = i, t = 0; t < 1 << Tt[r]; t++) Ut[i++] = r;
        for (i >>= 7; r < vt; r++) for (Vt[r] = i << 7, t = 0; t < 1 << Tt[r] - 7; t++) Ut[256 + i++] = r;
        for (a = 0; a <= yt; a++) s[a] = 0;
        for (t = 0; t <= 143; ) It[2 * t + 1] = 8, t++, s[8]++;
        for (;t <= 255; ) It[2 * t + 1] = 9, t++, s[9]++;
        for (;t <= 279; ) It[2 * t + 1] = 7, t++, s[7]++;
        for (;t <= 287; ) It[2 * t + 1] = 8, t++, s[8]++;
        for (_(It, bt + 1, s), t = 0; t < vt; t++) Et[2 * t + 1] = 5, Et[2 * t] = h(t, 5);
        Ht = new e(It, Ct, gt + 1, bt, yt), Nt = new e(Et, Tt, 0, vt, yt), Jt = new e(new Array(0), Dt, 0, wt, zt);
    }
    function u(t) {
        var e;
        for (e = 0; e < bt; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < vt; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < wt; e++) t.bl_tree[2 * e] = 0;
        t.dyn_ltree[2 * xt] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
    }
    function f(t) {
        t.bi_valid > 8 ? r(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), 
        t.bi_buf = 0, t.bi_valid = 0;
    }
    function c(t, e, a, n) {
        f(t), n && (r(t, a), r(t, ~a)), ht.arraySet(t.pending_buf, t.window, e, a, t.pending), 
        t.pending += a;
    }
    function p(t, e, a, n) {
        var r = 2 * e, i = 2 * a;
        return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a];
    }
    function g(t, e, a) {
        for (var n = t.heap[a], r = a << 1; r <= t.heap_len && (r < t.heap_len && p(e, t.heap[r + 1], t.heap[r], t.depth) && r++, 
        !p(e, n, t.heap[r], t.depth)); ) t.heap[a] = t.heap[r], a = r, r <<= 1;
        t.heap[a] = n;
    }
    function b(t, e, a) {
        var r, h, o, l, _ = 0;
        if (0 !== t.last_lit) do {
            r = t.pending_buf[t.d_buf + 2 * _] << 8 | t.pending_buf[t.d_buf + 2 * _ + 1], h = t.pending_buf[t.l_buf + _], 
            _++, 0 === r ? s(t, h, e) : (o = Ot[h], s(t, o + gt + 1, e), l = Ct[o], 0 !== l && (h -= Rt[o], 
            i(t, h, l)), r--, o = n(r), s(t, o, a), 0 !== (l = Tt[o]) && (r -= Vt[o], i(t, r, l)));
        } while (_ < t.last_lit);
        s(t, xt, e);
    }
    function v(t, e) {
        var a, n, r, i = e.dyn_tree, s = e.stat_desc.static_tree, h = e.stat_desc.has_stree, o = e.stat_desc.elems, d = -1;
        for (t.heap_len = 0, t.heap_max = mt, a = 0; a < o; a++) 0 !== i[2 * a] ? (t.heap[++t.heap_len] = d = a, 
        t.depth[a] = 0) : i[2 * a + 1] = 0;
        for (;t.heap_len < 2; ) r = t.heap[++t.heap_len] = d < 2 ? ++d : 0, i[2 * r] = 1, 
        t.depth[r] = 0, t.opt_len--, h && (t.static_len -= s[2 * r + 1]);
        for (e.max_code = d, a = t.heap_len >> 1; a >= 1; a--) g(t, i, a);
        r = o;
        do {
            a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], g(t, i, 1), n = t.heap[1], t.heap[--t.heap_max] = a, 
            t.heap[--t.heap_max] = n, i[2 * r] = i[2 * a] + i[2 * n], t.depth[r] = (t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, 
            i[2 * a + 1] = i[2 * n + 1] = r, t.heap[1] = r++, g(t, i, 1);
        } while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], l(t, e), _(i, d, t.bl_count);
    }
    function w(t, e, a) {
        var n, r, i = -1, s = e[1], h = 0, o = 7, l = 4;
        for (0 === s && (o = 138, l = 3), e[2 * (a + 1) + 1] = 65535, n = 0; n <= a; n++) r = s, 
        s = e[2 * (n + 1) + 1], ++h < o && r === s || (h < l ? t.bl_tree[2 * r] += h : 0 !== r ? (r !== i && t.bl_tree[2 * r]++, 
        t.bl_tree[2 * At]++) : h <= 10 ? t.bl_tree[2 * Bt]++ : t.bl_tree[2 * St]++, h = 0, 
        i = r, 0 === s ? (o = 138, l = 3) : r === s ? (o = 6, l = 3) : (o = 7, l = 4));
    }
    function m(t, e, a) {
        var n, r, h = -1, o = e[1], l = 0, _ = 7, d = 4;
        for (0 === o && (_ = 138, d = 3), n = 0; n <= a; n++) if (r = o, o = e[2 * (n + 1) + 1], 
        !(++l < _ && r === o)) {
            if (l < d) do {
                s(t, r, t.bl_tree);
            } while (0 != --l); else 0 !== r ? (r !== h && (s(t, r, t.bl_tree), l--), s(t, At, t.bl_tree), 
            i(t, l - 3, 2)) : l <= 10 ? (s(t, Bt, t.bl_tree), i(t, l - 3, 3)) : (s(t, St, t.bl_tree), 
            i(t, l - 11, 7));
            l = 0, h = r, 0 === o ? (_ = 138, d = 3) : r === o ? (_ = 6, d = 3) : (_ = 7, d = 4);
        }
    }
    function y(t) {
        var e;
        for (w(t, t.dyn_ltree, t.l_desc.max_code), w(t, t.dyn_dtree, t.d_desc.max_code), 
        v(t, t.bl_desc), e = wt - 1; e >= 3 && 0 === t.bl_tree[2 * jt[e] + 1]; e--) ;
        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
    }
    function k(t, e, a, n) {
        var r;
        for (i(t, e - 257, 5), i(t, a - 1, 5), i(t, n - 4, 4), r = 0; r < n; r++) i(t, t.bl_tree[2 * jt[r] + 1], 3);
        m(t, t.dyn_ltree, e - 1), m(t, t.dyn_dtree, a - 1);
    }
    function z(t) {
        var e, a = 4093624447;
        for (e = 0; e <= 31; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return lt;
        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return _t;
        for (e = 32; e < gt; e++) if (0 !== t.dyn_ltree[2 * e]) return _t;
        return lt;
    }
    function x(t) {
        Mt || (d(), Mt = !0), t.l_desc = new a(t.dyn_ltree, Ht), t.d_desc = new a(t.dyn_dtree, Nt), 
        t.bl_desc = new a(t.bl_tree, Jt), t.bi_buf = 0, t.bi_valid = 0, u(t);
    }
    function A(t, e, a, n) {
        i(t, (ut << 1) + (n ? 1 : 0), 3), c(t, e, a, !0);
    }
    function B(t) {
        i(t, ft << 1, 3), s(t, xt, It), o(t);
    }
    function S(t, e, a, n) {
        var r, s, h = 0;
        t.level > 0 ? (t.strm.data_type === dt && (t.strm.data_type = z(t)), v(t, t.l_desc), 
        v(t, t.d_desc), h = y(t), r = t.opt_len + 3 + 7 >>> 3, (s = t.static_len + 3 + 7 >>> 3) <= r && (r = s)) : r = s = a + 5, 
        a + 4 <= r && -1 !== e ? A(t, e, a, n) : t.strategy === ot || s === r ? (i(t, (ft << 1) + (n ? 1 : 0), 3), 
        b(t, It, Et)) : (i(t, (ct << 1) + (n ? 1 : 0), 3), k(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, h + 1), 
        b(t, t.dyn_ltree, t.dyn_dtree)), u(t), n && f(t);
    }
    function C(t, e, a) {
        return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, 
        t.pending_buf[t.l_buf + t.last_lit] = 255 & a, t.last_lit++, 0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, 
        e--, t.dyn_ltree[2 * (Ot[a] + gt + 1)]++, t.dyn_dtree[2 * n(e)]++), t.last_lit === t.lit_bufsize - 1;
    }
    function T(t, e, a, n) {
        for (var r = 65535 & t | 0, i = t >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
            s = a > 2e3 ? 2e3 : a, a -= s;
            do {
                r = r + e[n++] | 0, i = i + r | 0;
            } while (--s);
            r %= 65521, i %= 65521;
        }
        return r | i << 16 | 0;
    }
    function D(t, e, a, n) {
        var r = Gt, i = n + a;
        t ^= -1;
        for (var s = n; s < i; s++) t = t >>> 8 ^ r[255 & (t ^ e[s])];
        return -1 ^ t;
    }
    function j(t, e) {
        return t.msg = Zt[e], e;
    }
    function I(t) {
        return (t << 1) - (t > 4 ? 9 : 0);
    }
    function E(t) {
        for (var e = t.length; --e >= 0; ) t[e] = 0;
    }
    function U(t) {
        var e = t.state, a = e.pending;
        a > t.avail_out && (a = t.avail_out), 0 !== a && (ht.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), 
        t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 
        0 === e.pending && (e.pending_out = 0));
    }
    function O(t, e) {
        qt._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), 
        t.block_start = t.strstart, U(t.strm);
    }
    function R(t, e) {
        t.pending_buf[t.pending++] = e;
    }
    function V(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
    }
    function H(t, e, a, n) {
        var r = t.avail_in;
        return r > n && (r = n), 0 === r ? 0 : (t.avail_in -= r, ht.arraySet(e, t.input, t.next_in, r, a), 
        1 === t.state.wrap ? t.adler = Ft(t.adler, e, r, a) : 2 === t.state.wrap && (t.adler = Qt(t.adler, e, r, a)), 
        t.next_in += r, t.total_in += r, r);
    }
    function N(t, e) {
        var a, n, r = t.max_chain_length, i = t.strstart, s = t.prev_length, h = t.nice_match, o = t.strstart > t.w_size - Se ? t.strstart - (t.w_size - Se) : 0, l = t.window, _ = t.w_mask, d = t.prev, u = t.strstart + Be, f = l[i + s - 1], c = l[i + s];
        t.prev_length >= t.good_match && (r >>= 2), h > t.lookahead && (h = t.lookahead);
        do {
            if (a = e, l[a + s] === c && l[a + s - 1] === f && l[a] === l[i] && l[++a] === l[i + 1]) {
                i += 2, a++;
                do {} while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < u);
                if (n = Be - (u - i), i = u - Be, n > s) {
                    if (t.match_start = e, s = n, n >= h) break;
                    f = l[i + s - 1], c = l[i + s];
                }
            }
        } while ((e = d[e & _]) > o && 0 != --r);
        return s <= t.lookahead ? s : t.lookahead;
    }
    function J(t) {
        var e, a, n, r, i, s = t.w_size;
        do {
            if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= s + (s - Se)) {
                ht.arraySet(t.window, t.window, s, s, 0), t.match_start -= s, t.strstart -= s, t.block_start -= s, 
                a = t.hash_size, e = a;
                do {
                    n = t.head[--e], t.head[e] = n >= s ? n - s : 0;
                } while (--a);
                a = s, e = a;
                do {
                    n = t.prev[--e], t.prev[e] = n >= s ? n - s : 0;
                } while (--a);
                r += s;
            }
            if (0 === t.strm.avail_in) break;
            if (a = H(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += a, t.lookahead + t.insert >= Ae) for (i = t.strstart - t.insert, 
            t.ins_h = t.window[i], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + Ae - 1]) & t.hash_mask, 
            t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < Ae)); ) ;
        } while (t.lookahead < Se && 0 !== t.strm.avail_in);
    }
    function L(t, e) {
        var a = 65535;
        for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ;) {
            if (t.lookahead <= 1) {
                if (J(t), 0 === t.lookahead && e === $t) return Re;
                if (0 === t.lookahead) break;
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var n = t.block_start + a;
            if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, 
            O(t, !1), 0 === t.strm.avail_out)) return Re;
            if (t.strstart - t.block_start >= t.w_size - Se && (O(t, !1), 0 === t.strm.avail_out)) return Re;
        }
        return t.insert = 0, e === ae ? (O(t, !0), 0 === t.strm.avail_out ? He : Ne) : (t.strstart > t.block_start && (O(t, !1), 
        t.strm.avail_out), Re);
    }
    function M(t, e) {
        for (var a, n; ;) {
            if (t.lookahead < Se) {
                if (J(t), t.lookahead < Se && e === $t) return Re;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= Ae && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Ae - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            0 !== a && t.strstart - a <= t.w_size - Se && (t.match_length = N(t, a)), t.match_length >= Ae) if (n = qt._tr_tally(t, t.strstart - t.match_start, t.match_length - Ae), 
            t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= Ae) {
                t.match_length--;
                do {
                    t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Ae - 1]) & t.hash_mask, 
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                } while (0 != --t.match_length);
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], 
            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else n = qt._tr_tally(t, 0, t.window[t.strstart]), 
            t.lookahead--, t.strstart++;
            if (n && (O(t, !1), 0 === t.strm.avail_out)) return Re;
        }
        return t.insert = t.strstart < Ae - 1 ? t.strstart : Ae - 1, e === ae ? (O(t, !0), 
        0 === t.strm.avail_out ? He : Ne) : t.last_lit && (O(t, !1), 0 === t.strm.avail_out) ? Re : Ve;
    }
    function P(t, e) {
        for (var a, n, r; ;) {
            if (t.lookahead < Se) {
                if (J(t), t.lookahead < Se && e === $t) return Re;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= Ae && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Ae - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = Ae - 1, 
            0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - Se && (t.match_length = N(t, a), 
            t.match_length <= 5 && (t.strategy === _e || t.match_length === Ae && t.strstart - t.match_start > 4096) && (t.match_length = Ae - 1)), 
            t.prev_length >= Ae && t.match_length <= t.prev_length) {
                r = t.strstart + t.lookahead - Ae, n = qt._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - Ae), 
                t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do {
                    ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Ae - 1]) & t.hash_mask, 
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                } while (0 != --t.prev_length);
                if (t.match_available = 0, t.match_length = Ae - 1, t.strstart++, n && (O(t, !1), 
                0 === t.strm.avail_out)) return Re;
            } else if (t.match_available) {
                if (n = qt._tr_tally(t, 0, t.window[t.strstart - 1]), n && O(t, !1), t.strstart++, 
                t.lookahead--, 0 === t.strm.avail_out) return Re;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (n = qt._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), 
        t.insert = t.strstart < Ae - 1 ? t.strstart : Ae - 1, e === ae ? (O(t, !0), 0 === t.strm.avail_out ? He : Ne) : t.last_lit && (O(t, !1), 
        0 === t.strm.avail_out) ? Re : Ve;
    }
    function K(t, e) {
        for (var a, n, r, i, s = t.window; ;) {
            if (t.lookahead <= Be) {
                if (J(t), t.lookahead <= Be && e === $t) return Re;
                if (0 === t.lookahead) break;
            }
            if (t.match_length = 0, t.lookahead >= Ae && t.strstart > 0 && (r = t.strstart - 1, 
            (n = s[r]) === s[++r] && n === s[++r] && n === s[++r])) {
                i = t.strstart + Be;
                do {} while (n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && r < i);
                t.match_length = Be - (i - r), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= Ae ? (a = qt._tr_tally(t, 1, t.match_length - Ae), t.lookahead -= t.match_length, 
            t.strstart += t.match_length, t.match_length = 0) : (a = qt._tr_tally(t, 0, t.window[t.strstart]), 
            t.lookahead--, t.strstart++), a && (O(t, !1), 0 === t.strm.avail_out)) return Re;
        }
        return t.insert = 0, e === ae ? (O(t, !0), 0 === t.strm.avail_out ? He : Ne) : t.last_lit && (O(t, !1), 
        0 === t.strm.avail_out) ? Re : Ve;
    }
    function W(t, e) {
        for (var a; ;) {
            if (0 === t.lookahead && (J(t), 0 === t.lookahead)) {
                if (e === $t) return Re;
                break;
            }
            if (t.match_length = 0, a = qt._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, 
            t.strstart++, a && (O(t, !1), 0 === t.strm.avail_out)) return Re;
        }
        return t.insert = 0, e === ae ? (O(t, !0), 0 === t.strm.avail_out ? He : Ne) : t.last_lit && (O(t, !1), 
        0 === t.strm.avail_out) ? Re : Ve;
    }
    function X(t, e, a, n, r) {
        this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, 
        this.func = r;
    }
    function Y(t) {
        t.window_size = 2 * t.w_size, E(t.head), t.max_lazy_match = Lt[t.level].max_lazy, 
        t.good_match = Lt[t.level].good_length, t.nice_match = Lt[t.level].nice_length, 
        t.max_chain_length = Lt[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, 
        t.insert = 0, t.match_length = t.prev_length = Ae - 1, t.match_available = 0, t.ins_h = 0;
    }
    function q() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, 
        this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, 
        this.method = ge, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, 
        this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, 
        this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, 
        this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, 
        this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, 
        this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, 
        this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new ht.Buf16(2 * ze), 
        this.dyn_dtree = new ht.Buf16(2 * (2 * ye + 1)), this.bl_tree = new ht.Buf16(2 * (2 * ke + 1)), 
        E(this.dyn_ltree), E(this.dyn_dtree), E(this.bl_tree), this.l_desc = null, this.d_desc = null, 
        this.bl_desc = null, this.bl_count = new ht.Buf16(xe + 1), this.heap = new ht.Buf16(2 * me + 1), 
        E(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new ht.Buf16(2 * me + 1), 
        E(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, 
        this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, 
        this.bi_valid = 0;
    }
    function F(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = pe, e = t.state, 
        e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? Te : Ue, 
        t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = $t, qt._tr_init(e), re) : j(t, se);
    }
    function G(t) {
        var e = F(t);
        return e === re && Y(t.state), e;
    }
    function Q(t, e) {
        return t && t.state ? 2 !== t.state.wrap ? se : (t.state.gzhead = e, re) : se;
    }
    function Z(t, e, a, n, r, i) {
        if (!t) return se;
        var s = 1;
        if (e === le && (e = 6), n < 0 ? (s = 0, n = -n) : n > 15 && (s = 2, n -= 16), r < 1 || r > be || a !== ge || n < 8 || n > 15 || e < 0 || e > 9 || i < 0 || i > fe) return j(t, se);
        8 === n && (n = 9);
        var h = new q();
        return t.state = h, h.strm = t, h.wrap = s, h.gzhead = null, h.w_bits = n, h.w_size = 1 << h.w_bits, 
        h.w_mask = h.w_size - 1, h.hash_bits = r + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, 
        h.hash_shift = ~~((h.hash_bits + Ae - 1) / Ae), h.window = new ht.Buf8(2 * h.w_size), 
        h.head = new ht.Buf16(h.hash_size), h.prev = new ht.Buf16(h.w_size), h.lit_bufsize = 1 << r + 6, 
        h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new ht.Buf8(h.pending_buf_size), 
        h.d_buf = 1 * h.lit_bufsize, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = i, 
        h.method = a, G(t);
    }
    function $(t, e) {
        return Z(t, e, ge, ve, we, ce);
    }
    function tt(t, e) {
        var a, n, r, i;
        if (!t || !t.state || e > ne || e < 0) return t ? j(t, se) : se;
        if (n = t.state, !t.output || !t.input && 0 !== t.avail_in || n.status === Oe && e !== ae) return j(t, 0 === t.avail_out ? oe : se);
        if (n.strm = t, a = n.last_flush, n.last_flush = e, n.status === Te) if (2 === n.wrap) t.adler = 0, 
        R(n, 31), R(n, 139), R(n, 8), n.gzhead ? (R(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), 
        R(n, 255 & n.gzhead.time), R(n, n.gzhead.time >> 8 & 255), R(n, n.gzhead.time >> 16 & 255), 
        R(n, n.gzhead.time >> 24 & 255), R(n, 9 === n.level ? 2 : n.strategy >= de || n.level < 2 ? 4 : 0), 
        R(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (R(n, 255 & n.gzhead.extra.length), 
        R(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = Qt(t.adler, n.pending_buf, n.pending, 0)), 
        n.gzindex = 0, n.status = De) : (R(n, 0), R(n, 0), R(n, 0), R(n, 0), R(n, 0), R(n, 9 === n.level ? 2 : n.strategy >= de || n.level < 2 ? 4 : 0), 
        R(n, Je), n.status = Ue); else {
            var s = ge + (n.w_bits - 8 << 4) << 8, h = -1;
            h = n.strategy >= de || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3, 
            s |= h << 6, 0 !== n.strstart && (s |= Ce), s += 31 - s % 31, n.status = Ue, V(n, s), 
            0 !== n.strstart && (V(n, t.adler >>> 16), V(n, 65535 & t.adler)), t.adler = 1;
        }
        if (n.status === De) if (n.gzhead.extra) {
            for (r = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
            U(t), r = n.pending, n.pending !== n.pending_buf_size)); ) R(n, 255 & n.gzhead.extra[n.gzindex]), 
            n.gzindex++;
            n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
            n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = je);
        } else n.status = je;
        if (n.status === je) if (n.gzhead.name) {
            r = n.pending;
            do {
                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
                U(t), r = n.pending, n.pending === n.pending_buf_size)) {
                    i = 1;
                    break;
                }
                i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, 
                R(n, i);
            } while (0 !== i);
            n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
            0 === i && (n.gzindex = 0, n.status = Ie);
        } else n.status = Ie;
        if (n.status === Ie) if (n.gzhead.comment) {
            r = n.pending;
            do {
                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
                U(t), r = n.pending, n.pending === n.pending_buf_size)) {
                    i = 1;
                    break;
                }
                i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, 
                R(n, i);
            } while (0 !== i);
            n.gzhead.hcrc && n.pending > r && (t.adler = Qt(t.adler, n.pending_buf, n.pending - r, r)), 
            0 === i && (n.status = Ee);
        } else n.status = Ee;
        if (n.status === Ee && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && U(t), 
        n.pending + 2 <= n.pending_buf_size && (R(n, 255 & t.adler), R(n, t.adler >> 8 & 255), 
        t.adler = 0, n.status = Ue)) : n.status = Ue), 0 !== n.pending) {
            if (U(t), 0 === t.avail_out) return n.last_flush = -1, re;
        } else if (0 === t.avail_in && I(e) <= I(a) && e !== ae) return j(t, oe);
        if (n.status === Oe && 0 !== t.avail_in) return j(t, oe);
        if (0 !== t.avail_in || 0 !== n.lookahead || e !== $t && n.status !== Oe) {
            var o = n.strategy === de ? W(n, e) : n.strategy === ue ? K(n, e) : Lt[n.level].func(n, e);
            if (o !== He && o !== Ne || (n.status = Oe), o === Re || o === He) return 0 === t.avail_out && (n.last_flush = -1), 
            re;
            if (o === Ve && (e === te ? qt._tr_align(n) : e !== ne && (qt._tr_stored_block(n, 0, 0, !1), 
            e === ee && (E(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, 
            n.insert = 0))), U(t), 0 === t.avail_out)) return n.last_flush = -1, re;
        }
        return e !== ae ? re : n.wrap <= 0 ? ie : (2 === n.wrap ? (R(n, 255 & t.adler), 
        R(n, t.adler >> 8 & 255), R(n, t.adler >> 16 & 255), R(n, t.adler >> 24 & 255), 
        R(n, 255 & t.total_in), R(n, t.total_in >> 8 & 255), R(n, t.total_in >> 16 & 255), 
        R(n, t.total_in >> 24 & 255)) : (V(n, t.adler >>> 16), V(n, 65535 & t.adler)), U(t), 
        n.wrap > 0 && (n.wrap = -n.wrap), 0 !== n.pending ? re : ie);
    }
    function et(t) {
        var e;
        return t && t.state ? (e = t.state.status) !== Te && e !== De && e !== je && e !== Ie && e !== Ee && e !== Ue && e !== Oe ? j(t, se) : (t.state = null, 
        e === Ue ? j(t, he) : re) : se;
    }
    function at(t, e) {
        var a, n, r, i, s, h, o, l, _ = e.length;
        if (!t || !t.state) return se;
        if (a = t.state, 2 === (i = a.wrap) || 1 === i && a.status !== Te || a.lookahead) return se;
        for (1 === i && (t.adler = Ft(t.adler, e, _, 0)), a.wrap = 0, _ >= a.w_size && (0 === i && (E(a.head), 
        a.strstart = 0, a.block_start = 0, a.insert = 0), l = new ht.Buf8(a.w_size), ht.arraySet(l, e, _ - a.w_size, a.w_size, 0), 
        e = l, _ = a.w_size), s = t.avail_in, h = t.next_in, o = t.input, t.avail_in = _, 
        t.next_in = 0, t.input = e, J(a); a.lookahead >= Ae; ) {
            n = a.strstart, r = a.lookahead - (Ae - 1);
            do {
                a.ins_h = (a.ins_h << a.hash_shift ^ a.window[n + Ae - 1]) & a.hash_mask, a.prev[n & a.w_mask] = a.head[a.ins_h], 
                a.head[a.ins_h] = n, n++;
            } while (--r);
            a.strstart = n, a.lookahead = Ae - 1, J(a);
        }
        return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, 
        a.lookahead = 0, a.match_length = a.prev_length = Ae - 1, a.match_available = 0, 
        t.next_in = h, t.input = o, t.avail_in = s, a.wrap = i, re;
    }
    function nt(t, e) {
        if (e < 65537 && (t.subarray && Qe || !t.subarray && Ge)) return String.fromCharCode.apply(null, ht.shrinkBuf(t, e));
        for (var a = "", n = 0; n < e; n++) a += String.fromCharCode(t[n]);
        return a;
    }
    function rt() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, 
        this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, 
        this.data_type = 2, this.adler = 0;
    }
    function it(t) {
        if (!(this instanceof it)) return new it(t);
        this.options = ht.assign({
            level: la,
            method: da,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: _a,
            to: ""
        }, t || {});
        var e = this.options;
        e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), 
        this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new sa(), 
        this.strm.avail_out = 0;
        var a = Fe.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (a !== oa) throw new Error(Zt[a]);
        if (e.header && Fe.deflateSetHeader(this.strm, e.header), e.dictionary) {
            var n;
            if (n = "string" == typeof e.dictionary ? ia.string2buf(e.dictionary) : "[object ArrayBuffer]" === ha.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, 
            (a = Fe.deflateSetDictionary(this.strm, n)) !== oa) throw new Error(Zt[a]);
            this._dict_set = !0;
        }
    }
    function st(t, e) {
        var a = new it(e);
        if (a.push(t, !0), a.err) throw a.msg || Zt[a.err];
        return a.result;
    }
    var ht = function(t, e) {
        return e = {
            exports: {}
        }, function(t, e) {
            var a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            e.assign = function(t) {
                for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
                    var a = e.shift();
                    if (a) {
                        if ("object" != (void 0 === a ? "undefined" : _typeof(a))) throw new TypeError(a + "must be non-object");
                        for (var n in a) a.hasOwnProperty(n) && (t[n] = a[n]);
                    }
                }
                return t;
            }, e.shrinkBuf = function(t, e) {
                return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
            };
            var n = {
                arraySet: function(t, e, a, n, r) {
                    if (e.subarray && t.subarray) return void t.set(e.subarray(a, a + n), r);
                    for (var i = 0; i < n; i++) t[r + i] = e[a + i];
                },
                flattenChunks: function(t) {
                    var e, a, n, r, i, s;
                    for (n = 0, e = 0, a = t.length; e < a; e++) n += t[e].length;
                    for (s = new Uint8Array(n), r = 0, e = 0, a = t.length; e < a; e++) i = t[e], s.set(i, r), 
                    r += i.length;
                    return s;
                }
            }, r = {
                arraySet: function(t, e, a, n, r) {
                    for (var i = 0; i < n; i++) t[r + i] = e[a + i];
                },
                flattenChunks: function(t) {
                    return [].concat.apply([], t);
                }
            };
            e.setTyped = function(t) {
                t ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, n)) : (e.Buf8 = Array, 
                e.Buf16 = Array, e.Buf32 = Array, e.assign(e, r));
            }, e.setTyped(a);
        }(e, e.exports), e.exports;
    }(), ot = 4, lt = 0, _t = 1, dt = 2, ut = 0, ft = 1, ct = 2, pt = 29, gt = 256, bt = gt + 1 + pt, vt = 30, wt = 19, mt = 2 * bt + 1, yt = 15, kt = 16, zt = 7, xt = 256, At = 16, Bt = 17, St = 18, Ct = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ], Tt = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ], Dt = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ], jt = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ], It = new Array(2 * (bt + 2));
    t(It);
    var Et = new Array(2 * vt);
    t(Et);
    var Ut = new Array(512);
    t(Ut);
    var Ot = new Array(256);
    t(Ot);
    var Rt = new Array(pt);
    t(Rt);
    var Vt = new Array(vt);
    t(Vt);
    var Ht, Nt, Jt, Lt, Mt = !1, Pt = x, Kt = A, Wt = S, Xt = C, Yt = B, qt = {
        _tr_init: Pt,
        _tr_stored_block: Kt,
        _tr_flush_block: Wt,
        _tr_tally: Xt,
        _tr_align: Yt
    }, Ft = T, Gt = function() {
        for (var t, e = [], a = 0; a < 256; a++) {
            t = a;
            for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
            e[a] = t;
        }
        return e;
    }(), Qt = D, Zt = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, $t = 0, te = 1, ee = 3, ae = 4, ne = 5, re = 0, ie = 1, se = -2, he = -3, oe = -5, le = -1, _e = 1, de = 2, ue = 3, fe = 4, ce = 0, pe = 2, ge = 8, be = 9, ve = 15, we = 8, me = 286, ye = 30, ke = 19, ze = 2 * me + 1, xe = 15, Ae = 3, Be = 258, Se = Be + Ae + 1, Ce = 32, Te = 42, De = 69, je = 73, Ie = 91, Ee = 103, Ue = 113, Oe = 666, Re = 1, Ve = 2, He = 3, Ne = 4, Je = 3;
    Lt = [ new X(0, 0, 0, 0, L), new X(4, 4, 8, 4, M), new X(4, 5, 16, 8, M), new X(4, 6, 32, 32, M), new X(4, 4, 16, 16, P), new X(8, 16, 32, 32, P), new X(8, 16, 128, 128, P), new X(8, 32, 128, 256, P), new X(32, 128, 258, 1024, P), new X(32, 258, 258, 4096, P) ];
    var Le = $, Me = Z, Pe = G, Ke = F, We = Q, Xe = tt, Ye = et, qe = at, Fe = {
        deflateInit: Le,
        deflateInit2: Me,
        deflateReset: Pe,
        deflateResetKeep: Ke,
        deflateSetHeader: We,
        deflate: Xe,
        deflateEnd: Ye,
        deflateSetDictionary: qe,
        deflateInfo: "pako deflate (from Nodeca project)"
    }, Ge = !0, Qe = !0;
    try {
        String.fromCharCode.apply(null, [ 0 ]);
    } catch (t) {
        Ge = !1;
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
        Qe = !1;
    }
    for (var Ze = new ht.Buf8(256), $e = 0; $e < 256; $e++) Ze[$e] = $e >= 252 ? 6 : $e >= 248 ? 5 : $e >= 240 ? 4 : $e >= 224 ? 3 : $e >= 192 ? 2 : 1;
    Ze[254] = Ze[254] = 1;
    var ta = function(t) {
        var e, a, n, r, i, s = t.length, h = 0;
        for (r = 0; r < s; r++) a = t.charCodeAt(r), 55296 == (64512 & a) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
        r++), h += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
        for (e = new ht.Buf8(h), i = 0, r = 0; i < h; r++) a = t.charCodeAt(r), 55296 == (64512 & a) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
        r++), a < 128 ? e[i++] = a : a < 2048 ? (e[i++] = 192 | a >>> 6, e[i++] = 128 | 63 & a) : a < 65536 ? (e[i++] = 224 | a >>> 12, 
        e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a) : (e[i++] = 240 | a >>> 18, 
        e[i++] = 128 | a >>> 12 & 63, e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a);
        return e;
    }, ea = function(t) {
        return nt(t, t.length);
    }, aa = function(t) {
        for (var e = new ht.Buf8(t.length), a = 0, n = e.length; a < n; a++) e[a] = t.charCodeAt(a);
        return e;
    }, na = function(t, e) {
        var a, n, r, i, s = e || t.length, h = new Array(2 * s);
        for (n = 0, a = 0; a < s; ) if ((r = t[a++]) < 128) h[n++] = r; else if ((i = Ze[r]) > 4) h[n++] = 65533, 
        a += i - 1; else {
            for (r &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && a < s; ) r = r << 6 | 63 & t[a++], 
            i--;
            i > 1 ? h[n++] = 65533 : r < 65536 ? h[n++] = r : (r -= 65536, h[n++] = 55296 | r >> 10 & 1023, 
            h[n++] = 56320 | 1023 & r);
        }
        return nt(h, n);
    }, ra = function(t, e) {
        var a;
        for (e = e || t.length, e > t.length && (e = t.length), a = e - 1; a >= 0 && 128 == (192 & t[a]); ) a--;
        return a < 0 ? e : 0 === a ? e : a + Ze[t[a]] > e ? a : e;
    }, ia = {
        string2buf: ta,
        buf2binstring: ea,
        binstring2buf: aa,
        buf2string: na,
        utf8border: ra
    }, sa = rt, ha = Object.prototype.toString, oa = 0, la = -1, _a = 0, da = 8;
    it.prototype.push = function(t, e) {
        var a, n, r = this.strm, i = this.options.chunkSize;
        if (this.ended) return !1;
        n = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? r.input = ia.string2buf(t) : "[object ArrayBuffer]" === ha.call(t) ? r.input = new Uint8Array(t) : r.input = t, 
        r.next_in = 0, r.avail_in = r.input.length;
        do {
            if (0 === r.avail_out && (r.output = new ht.Buf8(i), r.next_out = 0, r.avail_out = i), 
            1 !== (a = Fe.deflate(r, n)) && a !== oa) return this.onEnd(a), this.ended = !0, 
            !1;
            0 !== r.avail_out && (0 !== r.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(ia.buf2binstring(ht.shrinkBuf(r.output, r.next_out))) : this.onData(ht.shrinkBuf(r.output, r.next_out)));
        } while ((r.avail_in > 0 || 0 === r.avail_out) && 1 !== a);
        return 4 === n ? (a = Fe.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, 
        a === oa) : 2 !== n || (this.onEnd(oa), r.avail_out = 0, !0);
    }, it.prototype.onData = function(t) {
        this.chunks.push(t);
    }, it.prototype.onEnd = function(t) {
        t === oa && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = ht.flattenChunks(this.chunks)), 
        this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    var ua = st, fa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ca = function(t) {
        return fa.charAt(t);
    }, pa = "undefined" != typeof top && top.btoa || function(t) {
        for (var e = [], a = 0, n = t.length, r = 0, i = 0; i < n; ++i) a += 1, 3 === a && (a = 0), 
        r = t.charCodeAt(i), 0 === a ? e.push(ca(63 & (t.charCodeAt(i - 1) << 2 | r >> 6)), ca(63 & r)) : 1 === a ? e.push(ca(r >> 2 & 63)) : e.push(ca(63 & (t.charCodeAt(i - 1) << 4 | r >> 4))), 
        i === n - 1 && a > 0 && e.push(ca(r << (3 - a << 1) & 63));
        if (a) for (;a < 3; ) a += 1, e.push("=");
        return e.join("");
    }, ga = function(t) {
        var e = ua(JSON.stringify(t), {
            to: "string"
        });
        return pa(e);
    }, ba = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : _typeof(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
    }, va = function(t) {
        var e = [];
        return Object.keys(t).sort().forEach(function(a) {
            var n = t[a];
            "_token" !== a && (n && "object" === (void 0 === n ? "undefined" : ba(n)) && (n = JSON.stringify(n)), 
            e.push(a + "=" + n));
        }), ga(e.join("&"));
    }, wa = {
        f: 0,
        r: 0,
        w: 0,
        h: 0
    }, ma = function(t) {
        wa.f = t;
    }, ya = {
        rId: 0,
        ts: 0,
        cts: 0,
        brVD: [],
        brR: [],
        bI: [],
        mT: [],
        kT: [],
        aT: [],
        tT: [],
        sign: ""
    }, ka = function() {
        if (ya.rId = wa.f, 0 === ya.ts && (ya.ts = Date.now()), 0 === ya.brVD.length || 0 === ya.brVD[0] || 0 === ya.brVD[1]) {
            var t = wa.r, e = wa.w, a = wa.h, n = Math.round(t * e), r = Math.round(t * a), i = [ e, a ], s = [ n, r ], h = s;
            ya.brVD = i, ya.brR = [ s, h, 24, 24 ];
        }
    }, za = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.touches, a = t.changedTouches, n = a && a[0] || e && e[0];
        if (n) {
            var r = n.clientX, i = void 0 === r ? 0 : r, s = n.clientY, h = void 0 === s ? 0 : s, o = e && e.length || a && a.length || 0;
            ya.mT = [ i + "," + h ].concat(ya.mT.slice(0, 29)), ya.tT = [ i + "," + h + "," + o ].concat(ya.tT.slice(0, 29));
        }
    }, xa = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.detail, a = e && e.x || 0, n = e && e.y || 0;
        ya.aT = [ a + "," + n + ",view" ].concat(ya.aT.slice(0, 29));
    }, Aa = function(t) {
        ka();
        var e = "", a = "";
        try {
            var n = getCurrentPages(), r = n.length;
            e = n[r - 1].__route__, r > 1 && (a = n[r - 2].__route__);
        } catch (t) {}
        var i = "";
        try {
            i = va(t);
        } catch (t) {}
        ya.sign = i, ya.cts = Date.now(), ya.bI = [ e, a ];
        try {
            return ga(ya);
        } catch (t) {
            return "";
        }
    };
    try {
        wx.getSystemInfo({
            success: function(t) {
                var e = t.pixelRatio, a = t.windowWidth, n = t.windowHeight;
                wa.r = e, wa.w = a, wa.h = n;
            }
        });
    } catch (t) {}
    var Ba = {
        i: ma,
        m: za,
        t: xa,
        r: Aa
    };
    module.exports = Ba;
}();