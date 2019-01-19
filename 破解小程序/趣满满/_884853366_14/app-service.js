	var __wxAppData = __wxAppData || {}; 	var __wxRoute = __wxRoute || ""; 	var __wxRouteBegin = __wxRouteBegin || ""; 	var __wxAppCode__ = __wxAppCode__ || {};	var global = global || {};	var __WXML_GLOBAL__=__WXML_GLOBAL__ || {};	var __wxAppCurrentFile__=__wxAppCurrentFile__||""; 	var Component = Component || function(){};	var definePlugin = definePlugin || function(){};	var requirePlugin = requirePlugin || function(){};	var Behavior = Behavior || function(){};
	/*v0.5vv_20181207_syb_scopedata*/global.__wcc_version__='v0.5vv_20181207_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'cinamer']])
Z([3,'item'])
Z([3,'cinameritem'])
Z([a,[3,'/pages/cinamermoviedetails/cinamermoviedetails?cinanmerId\x3d'],[[6],[[7],[3,'item']],[3,'cinemaid']],[3,'\x26movieid\x3d'],[[6],[[7],[3,'item']],[3,'movieid']],[3,'\x26ciName\x3d'],[[12],[[6],[[7],[3,'filters']],[3,'arrayToString']],[[5],[[6],[[7],[3,'item']],[3,'name']]]],[3,'\x26ciAdd\x3d'],[[12],[[6],[[7],[3,'filters']],[3,'arrayToString']],[[5],[[6],[[7],[3,'item']],[3,'address']]]]])
Z([[2,'==='],[[6],[[7],[3,'item']],[3,'isMyLike']],[1,1]])
Z([[2,'==='],[[6],[[7],[3,'item']],[3,'isThird']],[1,1]])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'showdesc'])
Z([3,'coupon'])
Z([[7],[3,'colors']])
Z([[2,'=='],[[6],[[7],[3,'data']],[3,'status']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'data']],[3,'status']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'data']],[3,'status']],[1,3]])
Z([[2,'&&'],[[2,'=='],[[6],[[7],[3,'data']],[3,'from']],[1,'pay']],[[2,'=='],[[6],[[7],[3,'data']],[3,'status']],[1,0]]])
Z([3,'check'])
Z([3,'radio'])
Z([[6],[[7],[3,'data']],[3,'cdkey_channel']])
Z([[6],[[7],[3,'data']],[3,'id']])
Z([[6],[[7],[3,'data']],[3,'cdkey_type']])
Z([a,[3,'background-color:'],[[2,'?:'],[[2,'=='],[[6],[[7],[3,'data']],[3,'is']],[1,0]],[1,'#fff'],[[6],[[7],[3,'colors']],[3,'maincolor']]],[3,';border:'],[[2,'?:'],[[2,'=='],[[6],[[7],[3,'data']],[3,'is']],[1,0]],[1,'1px solid #ddd'],[1,'1px solid transparent']]])
Z([[2,'=='],[[6],[[7],[3,'data']],[3,'is']],[1,1]])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'?:'],[[2,'==='],[[6],[[7],[3,'card']],[3,'from']],[1,'viewcard']],[1,'cardview'],[1,'usecard']])
Z([a,[3,'cards '],[[2,'?:'],[[2,'==='],[[6],[[7],[3,'card']],[3,'status']],[1,0]],[1,''],[1,'cards-gray']]])
Z([[6],[[7],[3,'card']],[3,'index']])
Z([[2,'==='],[[6],[[7],[3,'card']],[3,'from']],[1,'viewcard']])
Z([[2,'==='],[[6],[[7],[3,'card']],[3,'status']],[1,1]])
Z([[2,'==='],[[6],[[7],[3,'card']],[3,'status']],[1,2]])
Z([[2,'==='],[[6],[[7],[3,'card']],[3,'status']],[1,3]])
Z([[2,'==='],[[6],[[7],[3,'card']],[3,'from']],[1,'pay']])
Z([[2,'=='],[[6],[[7],[3,'card']],[3,'is_selected']],[1,1]])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'movie-info'])
Z([[2,'!='],[[6],[[7],[3,'movie']],[3,'movietype3']],[1,'']])
Z([[2,'=='],[[7],[3,'from']],[1,'likemovie']])
Z([3,'movie-subinfo xiaobaidian'])
Z([[2,'=='],[[6],[[7],[3,'movie']],[3,'searchData']],[1,undefined]])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'movie']],[3,'director']],[1,'']],[[2,'!='],[[6],[[7],[3,'movie']],[3,'starring']],[1,'']]])
Z([3,'movie-subinfo'])
Z(z[4])
Z([[2,'==='],[[6],[[7],[3,'movie']],[3,'booking']],[1,0]])
Z([[2,'==='],[[6],[[7],[3,'movie']],[3,'booking']],[1,1]])
Z([[2,'||'],[[2,'==='],[[6],[[7],[3,'movie']],[3,'booking']],[1,false]],[[2,'==='],[[6],[[7],[3,'movie']],[3,'booking']],[1,true]]])
Z([[2,'!='],[[7],[3,'from']],[1,'likemovie']])
Z([[2,'=='],[[6],[[7],[3,'movie']],[3,'buystaus']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'movie']],[3,'buystaus']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'movie']],[3,'buystaus']],[1,3]])
Z([[2,'=='],[[6],[[7],[3,'movie']],[3,'buystaus']],[1,4]])
Z([[7],[3,'showLogin']])
Z([3,'hideSheet'])
Z([3,'loginend'])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'colors']])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'change-container'])
Z([3,'change-item'])
Z([[7],[3,'wxlogin']])
Z([[7],[3,'phonelogin']])
Z([[2,'!'],[[7],[3,'phonelogin']]])
Z([[2,'!'],[[7],[3,'wxlogin']]])
Z([[7],[3,'hidden']])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'!='],[[7],[3,'pageLoaded']],[1,null]])
Z([3,'swiperChange'])
Z([[7],[3,'swiperCurrent']])
Z([3,'280rpx'])
Z(z[3])
Z([3,'idx'])
Z([3,'itemName'])
Z([[7],[3,'movieList']])
Z([3,'movielist'])
Z([[2,'!='],[[6],[[7],[3,'itemName']],[3,'movieid']],[1,undefined]])
Z([[7],[3,'movieInfo']])
Z([[6],[[7],[3,'days']],[3,'length']])
Z([3,'play-contend'])
Z([[2,'=='],[[7],[3,'plays']],[1,null]])
Z([[2,'&&'],[[2,'!='],[[7],[3,'plays']],[1,null]],[[2,'=='],[[6],[[7],[3,'plays']],[3,'length']],[1,0]]])
Z(z[5])
Z([3,'item'])
Z([[2,'&&'],[[2,'!='],[[7],[3,'plays']],[1,null]],[[7],[3,'plays']]])
Z(z[16])
Z([[6],[[7],[3,'item']],[3,'showCinamer']])
Z([3,'palyOpen'])
Z([3,'play-time-contend'])
Z([[2,'?:'],[[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'diffchannels']],[3,'length']],[1,0]],[1,true],[1,false]])
Z([[7],[3,'idx']])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'item']],[3,'group_lable']],[1,'']],[[2,'!='],[[6],[[7],[3,'item']],[3,'group_lable']],[1,undefined]]])
Z([3,'index_'])
Z([3,'channels_'])
Z([[6],[[7],[3,'item']],[3,'diffchannels']])
Z(z[16])
Z([[2,'?:'],[[2,'=='],[[6],[[7],[3,'channels_']],[3,'typeid']],[1,9]],[1,'handleBuy'],[1,'a']])
Z([a,[3,'play-chanel '],[[2,'?:'],[[2,'=='],[[6],[[7],[3,'channels_']],[3,'typeid']],[1,9]],[1,'qmm_play-chanel'],[1,'']]])
Z([[2,'+'],[[2,'+'],[[7],[3,'idx']],[1,',']],[[7],[3,'index_']]])
Z([[2,'=='],[[6],[[7],[3,'channels_']],[3,'typeid']],[1,9]])
Z([[7],[3,'showlogin']])
Z([3,'hideSheet'])
Z([3,'loginend'])
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'&&'],[[2,'!'],[[7],[3,'pageLoading']]],[[2,'!'],[[7],[3,'pageError']]]])
Z([3,'wrap-container'])
Z([[7],[3,'pageError']])
Z([[2,'>'],[[6],[[7],[3,'activities']],[3,'length']],[1,0]])
Z([[2,'>'],[[6],[[7],[3,'activities']],[3,'length']],[1,1]])
Z([[2,'!'],[[7],[3,'pageLoading']]])
Z([[7],[3,'movieClip']])
Z([[2,'!='],[[6],[[6],[[7],[3,'movieClip']],[[7],[3,'movieCurrent']]],[3,'pic']],[1,'/images/zhanwei_err.png']])
Z(z[5])
Z([3,'regionView'])
Z([a,[3,'height:'],[[2,'?:'],[[2,'||'],[[7],[3,'showRegin']],[[7],[3,'showOrder']]],[1,'500rpx'],[1,0]],[3,';']])
Z([[7],[3,'showRegin']])
Z([[7],[3,'region']])
Z([3,'item'])
Z([3,'checkregion'])
Z([3,'regionInfo'])
Z([3,'region'])
Z([[6],[[7],[3,'item']],[3,'regionname']])
Z([[2,'||'],[[2,'&&'],[[2,'=='],[[6],[[7],[3,'item']],[3,'regionname']],[1,'全部区域']],[[2,'=='],[[7],[3,'regionname']],[1,0]]],[[2,'=='],[[6],[[7],[3,'item']],[3,'regionname']],[[7],[3,'regionname']]]])
Z([[7],[3,'showOrder']])
Z([[7],[3,'orderArr']])
Z(z[13])
Z(z[14])
Z(z[15])
Z([[6],[[7],[3,'item']],[3,'order']])
Z([[6],[[7],[3,'item']],[3,'text']])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'order']],[[7],[3,'order']]])
Z([3,'cinamerlist'])
Z([[2,'||'],[[7],[3,'showRegin']],[[7],[3,'showOrder']]])
Z([[7],[3,'cinemas']])
Z([3,'icon-shoucangjiaobiao'])
Z([3,'icon-tuijianjiaobiao'])
Z([3,'iconfont'])
Z([[7],[3,'moveAdIcon']])
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'idx'])
Z([3,'itemName1'])
Z([[7],[3,'cityFirstl']])
Z([[6],[[7],[3,'itemName1']],[3,'itemName1']])
Z(z[0])
Z([3,'itemName'])
Z([[7],[3,'clitylist']])
Z([[6],[[7],[3,'itemName']],[3,'cityname']])
Z([[2,'=='],[[6],[[7],[3,'itemName']],[3,'firstletter']],[[7],[3,'itemName1']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
function gz$gwx_13(){
if( __WXML_GLOBAL__.ops_cached.$gwx_13)return __WXML_GLOBAL__.ops_cached.$gwx_13
__WXML_GLOBAL__.ops_cached.$gwx_13=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_13);return __WXML_GLOBAL__.ops_cached.$gwx_13
}
function gz$gwx_14(){
if( __WXML_GLOBAL__.ops_cached.$gwx_14)return __WXML_GLOBAL__.ops_cached.$gwx_14
__WXML_GLOBAL__.ops_cached.$gwx_14=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_14);return __WXML_GLOBAL__.ops_cached.$gwx_14
}
function gz$gwx_15(){
if( __WXML_GLOBAL__.ops_cached.$gwx_15)return __WXML_GLOBAL__.ops_cached.$gwx_15
__WXML_GLOBAL__.ops_cached.$gwx_15=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'wrap-container'])
Z([[2,'!'],[[7],[3,'hasnone']]])
Z([[7],[3,'movies']])
Z([3,'item'])
Z(z[1])
Z([3,'index'])
Z([3,'item_'])
Z([[6],[[7],[3,'item']],[3,'movies']])
Z(z[3])
Z([3,'likemovie'])
Z([[7],[3,'item_']])
})(__WXML_GLOBAL__.ops_cached.$gwx_15);return __WXML_GLOBAL__.ops_cached.$gwx_15
}
function gz$gwx_16(){
if( __WXML_GLOBAL__.ops_cached.$gwx_16)return __WXML_GLOBAL__.ops_cached.$gwx_16
__WXML_GLOBAL__.ops_cached.$gwx_16=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_16);return __WXML_GLOBAL__.ops_cached.$gwx_16
}
function gz$gwx_17(){
if( __WXML_GLOBAL__.ops_cached.$gwx_17)return __WXML_GLOBAL__.ops_cached.$gwx_17
__WXML_GLOBAL__.ops_cached.$gwx_17=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'mine-container'])
Z([[2,'=='],[[6],[[7],[3,'unPayOrder']],[3,'status']],[1,1]])
Z([[7],[3,'showlogin']])
Z([3,'hideSheet'])
Z([3,'loginend'])
})(__WXML_GLOBAL__.ops_cached.$gwx_17);return __WXML_GLOBAL__.ops_cached.$gwx_17
}
function gz$gwx_18(){
if( __WXML_GLOBAL__.ops_cached.$gwx_18)return __WXML_GLOBAL__.ops_cached.$gwx_18
__WXML_GLOBAL__.ops_cached.$gwx_18=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'moviedeails-container'])
Z([3,'height: 100%;'])
Z([[2,'=='],[[7],[3,'switchType']],[1,1]])
Z([[2,'!='],[[6],[[7],[3,'movie']],[3,'moviename']],[1,undefined]])
Z([3,'mvdetail_left'])
Z([[2,'!='],[[6],[[7],[3,'movie']],[3,'type']],[1,'']])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'movie']],[3,'movietype2']],[1,null]],[[2,'!='],[[6],[[7],[3,'movie']],[3,'movietype2']],[1,'']]])
Z([3,'mvdgp'])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'movie']],[3,'grade']],[1,'0.0']],[[2,'!='],[[6],[[7],[3,'movie']],[3,'grade']],[1,'']]])
Z([[2,'!='],[[6],[[7],[3,'movie']],[3,'like']],[1,0]])
Z([[2,'||'],[[2,'!='],[[7],[3,'cinemas']],[1,null]],[[7],[3,'bottomTagLoad']]])
Z(z[2])
Z([3,'movie_list_box'])
Z([[2,'?:'],[[7],[3,'actionStatus']],[1,'height: auto'],[1,'height: 400px']])
Z([[2,'=='],[[7],[3,'cinemas']],[1,null]])
Z([[2,'=='],[[6],[[7],[3,'cinemas']],[3,'length']],[1,0]])
Z([[7],[3,'cinemas']])
Z([3,'icon-shoucangjiaobiao'])
Z([3,'icon-tuijianjiaobiao'])
Z([3,'iconfont'])
Z([[2,'=='],[[7],[3,'switchType']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'movieDetails']],[3,'info']],[1,undefined]])
Z([3,'open'])
Z([3,'open-juqing'])
Z([a,[3,'position:'],[[7],[3,'position']],[3,';']])
Z([3,'open color3'])
Z([a,[3,'margin-top:'],[[7],[3,'top']],[3,'rpx']])
Z([[2,'=='],[[7],[3,'top']],[1,0]])
Z([[2,'=='],[[2,'!'],[[7],[3,'top']]],[1,0]])
Z([[2,'>'],[[6],[[7],[3,'actors']],[3,'length']],[1,0]])
Z([3,'i'])
Z([[7],[3,'actors']])
Z([3,'actors'])
Z([[2,'<'],[[7],[3,'i']],[1,5]])
Z([[2,'&&'],[[2,'>'],[[6],[[7],[3,'video']],[3,'length']],[1,0]],[[2,'>'],[[6],[[7],[3,'img']],[3,'length']],[1,0]]])
Z([3,'juzhao_scroll_x_box'])
Z([3,'true'])
Z([3,'height:194rpx;'])
Z([[2,'!='],[[6],[[7],[3,'video']],[3,'length']],[1,0]])
Z([3,'a'])
Z(z[30])
Z([[7],[3,'img']])
Z(z[41])
Z([[2,'<'],[[7],[3,'a']],[1,4]])
Z([[2,'||'],[[2,'||'],[[2,'||'],[[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'maoyanusergrade']],[1,'']],[[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'maoyanexpertgrade']],[1,'']]],[[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'doubangrade']],[1,'']]],[[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'mtimegrade']],[1,'']]])
Z([3,'movie-comment-content'])
Z([[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'maoyanusergrade']],[1,'']])
Z([[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'maoyanexpertgrade']],[1,'']])
Z([[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'doubangrade']],[1,'']])
Z([[2,'!='],[[6],[[7],[3,'movieDetails']],[3,'mtimegrade']],[1,'']])
Z([3,'pinglun'])
Z([[2,'=='],[[6],[[7],[3,'commentList']],[3,'length']],[1,0]])
Z([3,'item'])
Z([[7],[3,'commentList']])
Z([[6],[[7],[3,'item']],[3,'id']])
Z([[2,'>'],[[6],[[7],[3,'commentList']],[3,'length']],[1,0]])
Z([3,'height:400rpx;padding-bottom:20rpx;'])
Z([3,'getRegionName'])
Z([3,'cinemas-item-area'])
Z([3,''])
Z([[2,'?:'],[[2,'=='],[[7],[3,'regionname']],[1,'']],[[2,'+'],[1,'color:'],[[6],[[7],[3,'colors']],[3,'fontcolor']]],[1,'']])
Z([[2,'&&'],[[2,'=='],[[7],[3,'regionname']],[1,'']],[[7],[3,'colors']]])
Z([[7],[3,'areaInfo']])
Z([[6],[[7],[3,'item']],[3,'regionname']])
Z(z[57])
Z(z[58])
Z(z[63])
Z([3,'position: relative'])
Z([[2,'&&'],[[2,'&&'],[[2,'!='],[[7],[3,'regionname']],[1,'']],[[2,'=='],[[7],[3,'regionname']],[[6],[[7],[3,'item']],[3,'regionname']]]],[[7],[3,'colors']]])
Z([[7],[3,'showlogin']])
Z([3,'hideSheet'])
Z([3,'loginend'])
})(__WXML_GLOBAL__.ops_cached.$gwx_18);return __WXML_GLOBAL__.ops_cached.$gwx_18
}
function gz$gwx_19(){
if( __WXML_GLOBAL__.ops_cached.$gwx_19)return __WXML_GLOBAL__.ops_cached.$gwx_19
__WXML_GLOBAL__.ops_cached.$gwx_19=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'movielistbox'])
Z([[2,'==='],[[7],[3,'soon']],[1,0]])
Z([[7],[3,'hotMovie']])
Z([3,'item'])
Z([[7],[3,'item']])
Z([[2,'==='],[[7],[3,'soon']],[1,1]])
Z([[7],[3,'featureMovie']])
Z(z[3])
Z([[6],[[7],[3,'item']],[3,'movies']])
Z(z[3])
Z([3,'likemovie'])
Z(z[4])
})(__WXML_GLOBAL__.ops_cached.$gwx_19);return __WXML_GLOBAL__.ops_cached.$gwx_19
}
function gz$gwx_20(){
if( __WXML_GLOBAL__.ops_cached.$gwx_20)return __WXML_GLOBAL__.ops_cached.$gwx_20
__WXML_GLOBAL__.ops_cached.$gwx_20=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'coupon-container'])
Z([3,'coupon-box'])
Z([[2,'!'],[[7],[3,'showStatus']]])
Z([[7],[3,'showStatus']])
Z(z[3])
Z(z[3])
Z(z[2])
Z([[2,'=='],[[6],[[7],[3,'lottery']],[3,'length']],[1,0]])
Z([3,'handleToMore'])
Z([3,'true'])
Z([a,[3,'height:'],[[2,'?:'],[[7],[3,'showStatus']],[1,'calc(100% - 452rpx)'],[1,'calc(100% - 194rpx)']]])
Z([[7],[3,'lottery']])
Z([3,'item'])
Z([[7],[3,'item']])
Z([3,'icon-dianyingquan'])
Z([3,'iconfont'])
Z([[7],[3,'showMask']])
})(__WXML_GLOBAL__.ops_cached.$gwx_20);return __WXML_GLOBAL__.ops_cached.$gwx_20
}
function gz$gwx_21(){
if( __WXML_GLOBAL__.ops_cached.$gwx_21)return __WXML_GLOBAL__.ops_cached.$gwx_21
__WXML_GLOBAL__.ops_cached.$gwx_21=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'myorder-container'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'orderList']])
Z(z[2])
Z([3,'indx'])
Z([3,'item1'])
Z([[7],[3,'item']])
Z([3,'item.buytime'])
Z([[2,'||'],[[2,'=='],[[6],[[7],[3,'item1']],[3,'status']],[1,0]],[[2,'=='],[[6],[[7],[3,'item1']],[3,'status']],[1,1]]])
Z([[2,'&&'],[[2,'>'],[[6],[[7],[3,'item1']],[3,'residuetime']],[1,0]],[[2,'=='],[[6],[[7],[3,'item1']],[3,'status']],[1,2]]])
Z([[2,'=='],[[6],[[7],[3,'orderList']],[3,'length']],[1,0]])
})(__WXML_GLOBAL__.ops_cached.$gwx_21);return __WXML_GLOBAL__.ops_cached.$gwx_21
}
function gz$gwx_22(){
if( __WXML_GLOBAL__.ops_cached.$gwx_22)return __WXML_GLOBAL__.ops_cached.$gwx_22
__WXML_GLOBAL__.ops_cached.$gwx_22=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([a,[3,'orderdetail-container '],[[2,'?:'],[[2,'&&'],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,undefined]],[[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,0]]],[1,'pdb100'],[1,'']]])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,undefined]],[[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,0]]])
Z([3,'group-info'])
Z([3,'sub-group-person'])
Z([[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'finish_time']],[1,0]])
Z([[2,'!'],[[7],[3,'tail_end']]])
Z([[2,'=='],[[7],[3,'freepay']],[1,0]])
Z([3,'order-details'])
Z([a,[3,'status_box '],[[2,'?:'],[[2,'&&'],[[2,'>='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,3]],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,5]]],[1,'status_box_gray'],[1,'']]])
Z([[2,'?:'],[[2,'&&'],[[2,'>='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,3]],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,5]]],[1,''],[[2,'+'],[1,'background-color:'],[[6],[[7],[3,'colors']],[3,'codebg']]]])
Z([[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,5]])
Z([[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,3]])
Z([[2,'||'],[[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,4]],[[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,5]]])
Z([[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,2]])
Z([3,'user-order-info'])
Z([[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'paytype']],[1,'']])
Z([[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'cdkeyname']],[1,'']])
Z([[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'servicecost']],[1,'']])
Z([[2,'&&'],[[2,'&&'],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,undefined]],[[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'groupid']],[1,0]]],[[2,'>'],[[6],[[7],[3,'orderinfo']],[3,'finish_time']],[1,0]]])
Z(z[1])
Z(z[4])
Z([[2,'&&'],[[2,'&&'],[[2,'&&'],[[2,'!='],[[6],[[7],[3,'orderinfo']],[3,'tail_money']],[1,'0']],[[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'finish_time']],[1,0]]],[[2,'!'],[[7],[3,'tail_end']]]],[[2,'||'],[[2,'||'],[[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,5]],[[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,3]]],[[2,'=='],[[6],[[7],[3,'orderinfo']],[3,'status']],[1,2]]]])
Z(z[4])
Z([3,'draw'])
Z([[6],[[7],[3,'colors']],[3,'maincolor']])
Z([[6],[[7],[3,'orderinfo']],[3,'best_price']])
Z([[6],[[7],[3,'orderinfo']],[3,'moviename']])
Z([[6],[[7],[3,'orderinfo']],[3,'moviepic']])
Z([[6],[[7],[3,'orderinfo']],[3,'origin_price']])
})(__WXML_GLOBAL__.ops_cached.$gwx_22);return __WXML_GLOBAL__.ops_cached.$gwx_22
}
function gz$gwx_23(){
if( __WXML_GLOBAL__.ops_cached.$gwx_23)return __WXML_GLOBAL__.ops_cached.$gwx_23
__WXML_GLOBAL__.ops_cached.$gwx_23=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'pay-container'])
Z([3,'pay-body-item'])
Z([[2,'&&'],[[2,'!='],[[6],[[7],[3,'orderinfor']],[3,'group_msg']],[1,'']],[[2,'!='],[[6],[[7],[3,'orderinfor']],[3,'group_msg']],[1,undefined]]])
Z([[2,'!='],[[6],[[7],[3,'orderinfor']],[3,'servicecost']],[1,0]])
Z([3,'actionSheetbindchange'])
Z([[7],[3,'actionStatus']])
Z([3,'background: #f3f3f3;'])
Z([[2,'==='],[[7],[3,'showCard']],[1,false]])
Z([[2,'!'],[[7],[3,'showBto']]])
Z([[2,'>'],[[6],[[7],[3,'lottery']],[3,'length']],[1,0]])
Z([3,'handleToMore'])
Z([3,'true'])
Z([3,'height: 440rpx'])
Z([[7],[3,'lottery']])
Z([3,'item'])
Z([3,'radioChange'])
Z([[7],[3,'item']])
Z([3,'icon-dianyingquan'])
Z([3,'icon-dizhixuanzhong'])
Z([3,'iconfont'])
Z([[7],[3,'showBto']])
Z([[2,'==='],[[7],[3,'showCard']],[1,true]])
Z([3,'action-btn'])
Z([[2,'=='],[[6],[[7],[3,'cardlist']],[3,'length']],[1,0]])
Z([[2,'>'],[[6],[[7],[3,'cardlist']],[3,'length']],[1,0]])
Z([3,'cinemas-box'])
Z(z[24])
Z(z[11])
Z(z[12])
Z(z[24])
Z([[7],[3,'cardlist']])
Z(z[14])
Z([3,'usecard'])
Z(z[16])
Z(z[18])
Z(z[19])
Z(z[23])
})(__WXML_GLOBAL__.ops_cached.$gwx_23);return __WXML_GLOBAL__.ops_cached.$gwx_23
}
function gz$gwx_24(){
if( __WXML_GLOBAL__.ops_cached.$gwx_24)return __WXML_GLOBAL__.ops_cached.$gwx_24
__WXML_GLOBAL__.ops_cached.$gwx_24=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'i'])
Z([[7],[3,'video']])
Z([[7],[3,'i']])
Z([[2,'!='],[[6],[[7],[3,'video']],[3,'length']],[1,0]])
})(__WXML_GLOBAL__.ops_cached.$gwx_24);return __WXML_GLOBAL__.ops_cached.$gwx_24
}
function gz$gwx_25(){
if( __WXML_GLOBAL__.ops_cached.$gwx_25)return __WXML_GLOBAL__.ops_cached.$gwx_25
__WXML_GLOBAL__.ops_cached.$gwx_25=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_25);return __WXML_GLOBAL__.ops_cached.$gwx_25
}
function gz$gwx_26(){
if( __WXML_GLOBAL__.ops_cached.$gwx_26)return __WXML_GLOBAL__.ops_cached.$gwx_26
__WXML_GLOBAL__.ops_cached.$gwx_26=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'search-container'])
Z([[2,'!='],[[6],[[7],[3,'hotwords']],[3,'length']],[1,0]])
Z([3,'i'])
Z([[7],[3,'hotwords']])
Z([3,'item'])
Z([[2,'!='],[[7],[3,'item']],[1,'']])
Z([3,'handleToHotSearch'])
Z([3,'hot-movie'])
Z([[7],[3,'item']])
Z([[2,'=='],[[7],[3,'i']],[1,0]])
Z([[2,'=='],[[7],[3,'i']],[1,1]])
Z([[2,'=='],[[7],[3,'i']],[1,2]])
Z([[7],[3,'movieList']])
Z(z[4])
Z(z[8])
Z([[7],[3,'cinemaList']])
})(__WXML_GLOBAL__.ops_cached.$gwx_26);return __WXML_GLOBAL__.ops_cached.$gwx_26
}
function gz$gwx_27(){
if( __WXML_GLOBAL__.ops_cached.$gwx_27)return __WXML_GLOBAL__.ops_cached.$gwx_27
__WXML_GLOBAL__.ops_cached.$gwx_27=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'!='],[[6],[[7],[3,'opt']],[3,'isactive']],[1,'true']])
Z([[2,'&&'],[[7],[3,'notice']],[[2,'!='],[[7],[3,'notice']],[1,'']]])
Z([3,'onChange'])
Z([3,'onScale'])
Z([3,'all'])
Z([3,'movable-view-box'])
Z([1,1])
Z([1,0.7])
Z([[7],[3,'scaleValue']])
Z([a,[3,'width:'],[[2,'*'],[[2,'+'],[[6],[[7],[3,'colArr']],[3,'length']],[1,1]],[1,70]],[3,'rpx;height:'],[[7],[3,'movableHeight']]])
Z([[7],[3,'seatX']])
Z([[7],[3,'seatY']])
Z([[2,'!='],[[6],[[7],[3,'seatdata']],[3,'length']],[1,0]])
Z([3,'i'])
Z(z[13])
Z([[7],[3,'seatdata']])
Z([3,'seatitem'])
Z([3,'j'])
Z(z[17])
Z([[6],[[7],[3,'seatdata']],[[7],[3,'i']]])
Z([3,'seatdata'])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'status']],[1,0]],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'loveFlag']],[1,0]]])
Z([3,'seatchoose'])
Z([a,[3,'seattext seat seat'],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'status']],[3,' '],[[2,'?:'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'checked']],[1,1]],[1,'seat2'],[1,'']],[3,' '],[[2,'?:'],[[2,'=='],[[6],[[7],[3,'opt']],[3,'type']],[1,8]],[1,'tehuiSeat'],[1,'']]])
Z([[2,'+'],[[2,'+'],[[7],[3,'i']],[1,',']],[[7],[3,'j']]])
Z([[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'checked']],[1,1]])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'loveFlag']],[1,1]],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'loveSeat']],[1,'left']]])
Z([[2,'?:'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'status']],[1,0]],[1,'seatchoose'],[1,'']])
Z([a,[3,'seattext seat seatLoveLeft '],[[2,'?:'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'checked']],[1,1]],[1,'seatLoveLeftCheck'],[1,'']],[3,'  '],[[2,'?:'],[[2,'!='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'status']],[1,0]],[1,'seatLoveLeftnoCheck'],[1,'']]])
Z(z[24])
Z(z[25])
Z([[2,'&&'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'loveFlag']],[1,1]],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'loveSeat']],[1,'right']]])
Z(z[27])
Z([a,[3,'seattext seat seatLoveRight '],[[2,'?:'],[[2,'=='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'checked']],[1,1]],[1,'seatLoveRightCheck'],[1,'']],z[23][3],[[2,'?:'],[[2,'!='],[[6],[[6],[[6],[[7],[3,'seatdata']],[[7],[3,'i']]],[[7],[3,'j']]],[3,'status']],[1,0]],[1,'seatLoveRightnoCheck'],[1,'']]])
Z(z[24])
Z(z[25])
Z([[7],[3,'phonesheet']])
Z(z[36])
Z([[2,'!'],[[7],[3,'phonesheet']]])
Z([3,'maskHidden'])
Z([3,'mask'])
Z([[7],[3,'mask']])
Z([3,'idx'])
Z([3,'item'])
Z([[7],[3,'playData']])
Z([3,'playdata'])
Z([[2,'!='],[[6],[[6],[[7],[3,'item']],[3,'diffchannels']],[3,'length']],[1,0]])
Z([3,'changeScreeningData'])
Z([3,'list-item'])
Z([[7],[3,'item']])
Z([[2,'!='],[[6],[[6],[[6],[[7],[3,'item']],[3,'diffchannels']],[1,0]],[3,'group_actid']],[1,0]])
})(__WXML_GLOBAL__.ops_cached.$gwx_27);return __WXML_GLOBAL__.ops_cached.$gwx_27
}
function gz$gwx_28(){
if( __WXML_GLOBAL__.ops_cached.$gwx_28)return __WXML_GLOBAL__.ops_cached.$gwx_28
__WXML_GLOBAL__.ops_cached.$gwx_28=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_28);return __WXML_GLOBAL__.ops_cached.$gwx_28
}
function gz$gwx_29(){
if( __WXML_GLOBAL__.ops_cached.$gwx_29)return __WXML_GLOBAL__.ops_cached.$gwx_29
__WXML_GLOBAL__.ops_cached.$gwx_29=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'card-list'])
Z([[2,'==='],[[6],[[7],[3,'cardlist']],[3,'length']],[1,0]])
Z([[7],[3,'cardlist']])
Z([3,'item'])
Z([[2,'>'],[[6],[[7],[3,'cardlist']],[3,'length']],[1,0]])
Z([3,'cardview'])
Z([[7],[3,'item']])
})(__WXML_GLOBAL__.ops_cached.$gwx_29);return __WXML_GLOBAL__.ops_cached.$gwx_29
}
function gz$gwx_30(){
if( __WXML_GLOBAL__.ops_cached.$gwx_30)return __WXML_GLOBAL__.ops_cached.$gwx_30
__WXML_GLOBAL__.ops_cached.$gwx_30=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_30);return __WXML_GLOBAL__.ops_cached.$gwx_30
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={"p_./pages/filter.wxs":np_0,};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
f_['./component/cinamerlist/cinamerlist.wxml']={};
f_['./component/cinamerlist/cinamerlist.wxml']['filters'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./component/cinamerlist/cinamerlist.wxml']['filters']();

f_['./component/movielist/movielist.wxml']={};
f_['./component/movielist/movielist.wxml']['filters'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./component/movielist/movielist.wxml']['filters']();

f_['./pages/cinamermoviedetails/cinamermoviedetails.wxml']={};
f_['./pages/cinamermoviedetails/cinamermoviedetails.wxml']['filters'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./pages/cinamermoviedetails/cinamermoviedetails.wxml']['filters']();

f_['./pages/filter.wxs'] = nv_require("p_./pages/filter.wxs");
function np_0(){var nv_module={nv_exports:{}};var nv_filters = ({nv_toFix:(function (nv_value){return(nv_value.nv_toFixed(1))}),nv_movietype:(function (nv_str){if (nv_str != undefined){return(nv_str.nv_split(" "))} else {return([])}}),nv_toNumber:(function (nv_val1,nv_val2){return(Number)(nv_val1) + Number(nv_val2)}),nv_arrayToString:(function (nv_val){return(nv_val.nv_toString().nv_replace(nv_getRegExp(',','g'),""))}),nv_lengthtokm:(function (nv_val){if (nv_val < 1000){return(nv_val + 'm')} else {var nv_km = nv_val / 1000;return(nv_km.nv_toFixed(1) + 'Km')}}),});function nv_myformatTime(nv_time){nv_console.nv_log(nv_time);if (typeof nv_time !== 'number' || nv_time < 0){return(nv_time)};var nv_hour = nv_parseInt(nv_time / 3600,10);nv_time = nv_time % 3600;var nv_minute = nv_parseInt(nv_time / 60,10);if (nv_hour == 0){return(nv_minute + '分')} else {return(nv_hour + '小时' + nv_minute + '分')}};nv_module.nv_exports = ({nv_toFix:nv_filters.nv_toFix,nv_movietype:nv_filters.nv_movietype,nv_toNumber:nv_filters.nv_toNumber,nv_myformatTime:nv_myformatTime,nv_arrayToString:nv_filters.nv_arrayToString,nv_lengthtokm:nv_filters.nv_lengthtokm,});return nv_module.nv_exports;}

f_['./pages/likecinamer/likecinamer.wxml']={};
f_['./pages/likecinamer/likecinamer.wxml']['filters'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./pages/likecinamer/likecinamer.wxml']['filters']();

f_['./pages/moviedetail/moviedetail.wxml']={};
f_['./pages/moviedetail/moviedetail.wxml']['filters'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./pages/moviedetail/moviedetail.wxml']['filters']();

f_['./pages/myorder/myorder.wxml']={};
f_['./pages/myorder/myorder.wxml']['tools'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./pages/myorder/myorder.wxml']['tools']();

f_['./pages/seat/seat.wxml']={};
f_['./pages/seat/seat.wxml']['filter'] =f_['./pages/filter.wxs'] || nv_require("p_./pages/filter.wxs");
f_['./pages/seat/seat.wxml']['filter']();

var x=['./component/cinamerlist/cinamerlist.wxml','./component/coupon/coupon.wxml','./component/loginsheet/loginsheet.wxml','./component/moviecard/moviecard.wxml','./component/movielist/movielist.wxml','./component/sharecanvas/sharecanvas.wxml','./pages/aboutus/aboutus.wxml','./pages/actors/actors.wxml','./pages/changeAcount/changeAcount.wxml','./pages/cinamermoviedetails/cinamermoviedetails.wxml','./pages/index/index.wxml','./pages/item/citylist/citylist.wxml','./pages/item/citylist/region.wxml','./pages/likecinamer/likecinamer.wxml','./pages/likemovie/likemovie.wxml','./pages/map/map.wxml','./pages/mine/mine.wxml','./pages/moviedetail/moviedetail.wxml','./pages/movies/movies.wxml','./pages/mycoupon/mycoupon.wxml','./pages/myorder/myorder.wxml','./pages/orderdetails/orderdetails.wxml','./pages/pay/pay.wxml','./pages/performerOrDrama/performerOrDrama.wxml','./pages/phoneLogin/phoneLogin.wxml','./pages/search/search.wxml','./pages/seat/seat.wxml','./pages/viedo/viedo.wxml','./pages/viewCard/viewCard.wxml','./pages/webbiew/webbiew.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_v()
_(r,oB)
var xC=function(fE,oD,cF,gg){
var oH=_mz(z,'navigator',['class',2,'url',1],[],fE,oD,gg)
var cI=_v()
_(oH,cI)
if(_oz(z,4,fE,oD,gg)){cI.wxVkey=1
}
var oJ=_v()
_(oH,oJ)
if(_oz(z,5,fE,oD,gg)){oJ.wxVkey=1
}
cI.wxXCkey=1
oJ.wxXCkey=1
_(cF,oH)
return cF
}
oB.wxXCkey=2
_2z(z,0,xC,e,s,gg,oB,'item','index','item')
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var aL=_mz(z,'view',['bindtap',0,'class',1],[],e,s,gg)
var tM=_v()
_(aL,tM)
if(_oz(z,2,e,s,gg)){tM.wxVkey=1
}
var bO=_v()
_(aL,bO)
if(_oz(z,3,e,s,gg)){bO.wxVkey=1
}
var oP=_v()
_(aL,oP)
if(_oz(z,4,e,s,gg)){oP.wxVkey=1
}
var xQ=_v()
_(aL,xQ)
if(_oz(z,5,e,s,gg)){xQ.wxVkey=1
}
bO.wxXCkey=1
oP.wxXCkey=1
xQ.wxXCkey=1
var eN=_v()
_(aL,eN)
if(_oz(z,6,e,s,gg)){eN.wxVkey=1
var oR=_mz(z,'view',['catchtap',7,'class',1,'data-channel',2,'data-id',3,'data-type',4,'style',5],[],e,s,gg)
var fS=_v()
_(oR,fS)
if(_oz(z,13,e,s,gg)){fS.wxVkey=1
}
fS.wxXCkey=1
_(eN,oR)
}
tM.wxXCkey=1
eN.wxXCkey=1
_(r,aL)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
var oV=_mz(z,'view',['bindtap',0,'class',1,'data-index',1],[],e,s,gg)
var cW=_v()
_(oV,cW)
if(_oz(z,3,e,s,gg)){cW.wxVkey=1
var lY=_v()
_(cW,lY)
if(_oz(z,4,e,s,gg)){lY.wxVkey=1
}
var aZ=_v()
_(cW,aZ)
if(_oz(z,5,e,s,gg)){aZ.wxVkey=1
}
var t1=_v()
_(cW,t1)
if(_oz(z,6,e,s,gg)){t1.wxVkey=1
}
lY.wxXCkey=1
aZ.wxXCkey=1
t1.wxXCkey=1
}
var oX=_v()
_(oV,oX)
if(_oz(z,7,e,s,gg)){oX.wxVkey=1
var e2=_v()
_(oX,e2)
if(_oz(z,8,e,s,gg)){e2.wxVkey=1
}
e2.wxXCkey=1
}
cW.wxXCkey=1
oX.wxXCkey=1
_(r,oV)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
var x5=_n('view')
_rz(z,x5,'class',0,e,s,gg)
var o6=_v()
_(x5,o6)
if(_oz(z,1,e,s,gg)){o6.wxVkey=1
}
var f7=_v()
_(x5,f7)
if(_oz(z,2,e,s,gg)){f7.wxVkey=1
}
var h9=_n('view')
_rz(z,h9,'class',3,e,s,gg)
var o0=_v()
_(h9,o0)
if(_oz(z,4,e,s,gg)){o0.wxVkey=1
var cAB=_v()
_(o0,cAB)
if(_oz(z,5,e,s,gg)){cAB.wxVkey=1
}
cAB.wxXCkey=1
}
else{o0.wxVkey=2
}
o0.wxXCkey=1
_(x5,h9)
var oBB=_n('view')
_rz(z,oBB,'class',6,e,s,gg)
var lCB=_v()
_(oBB,lCB)
if(_oz(z,7,e,s,gg)){lCB.wxVkey=1
var aDB=_v()
_(lCB,aDB)
if(_oz(z,8,e,s,gg)){aDB.wxVkey=1
}
var tEB=_v()
_(lCB,tEB)
if(_oz(z,9,e,s,gg)){tEB.wxVkey=1
}
var eFB=_v()
_(lCB,eFB)
if(_oz(z,10,e,s,gg)){eFB.wxVkey=1
}
aDB.wxXCkey=1
tEB.wxXCkey=1
eFB.wxXCkey=1
}
else{lCB.wxVkey=2
}
lCB.wxXCkey=1
_(x5,oBB)
var c8=_v()
_(x5,c8)
if(_oz(z,11,e,s,gg)){c8.wxVkey=1
var bGB=_v()
_(c8,bGB)
if(_oz(z,12,e,s,gg)){bGB.wxVkey=1
}
var oHB=_v()
_(c8,oHB)
if(_oz(z,13,e,s,gg)){oHB.wxVkey=1
}
var xIB=_v()
_(c8,xIB)
if(_oz(z,14,e,s,gg)){xIB.wxVkey=1
}
var oJB=_v()
_(c8,oJB)
if(_oz(z,15,e,s,gg)){oJB.wxVkey=1
}
bGB.wxXCkey=1
oHB.wxXCkey=1
xIB.wxXCkey=1
oJB.wxXCkey=1
}
o6.wxXCkey=1
f7.wxXCkey=1
c8.wxXCkey=1
_(r,x5)
var o4=_v()
_(r,o4)
if(_oz(z,16,e,s,gg)){o4.wxVkey=1
var fKB=_mz(z,'loginsheet',['bind:hideSheet',17,'bind:loginend',1],[],e,s,gg)
_(o4,fKB)
}
o4.wxXCkey=1
o4.wxXCkey=3
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
var oNB=_v()
_(r,oNB)
if(_oz(z,0,e,s,gg)){oNB.wxVkey=1
}
oNB.wxXCkey=1
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
var lQB=_n('view')
_rz(z,lQB,'class',0,e,s,gg)
var bUB=_n('view')
_rz(z,bUB,'class',1,e,s,gg)
var oVB=_v()
_(bUB,oVB)
if(_oz(z,2,e,s,gg)){oVB.wxVkey=1
}
var xWB=_v()
_(bUB,xWB)
if(_oz(z,3,e,s,gg)){xWB.wxVkey=1
}
oVB.wxXCkey=1
xWB.wxXCkey=1
_(lQB,bUB)
var aRB=_v()
_(lQB,aRB)
if(_oz(z,4,e,s,gg)){aRB.wxVkey=1
}
var tSB=_v()
_(lQB,tSB)
if(_oz(z,5,e,s,gg)){tSB.wxVkey=1
}
var eTB=_v()
_(lQB,eTB)
if(_oz(z,6,e,s,gg)){eTB.wxVkey=1
}
aRB.wxXCkey=1
tSB.wxXCkey=1
eTB.wxXCkey=1
_(r,lQB)
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
var fYB=_v()
_(r,fYB)
if(_oz(z,0,e,s,gg)){fYB.wxVkey=1
var c3B=_mz(z,'swiper',['bindchange',1,'current',1,'nextMargin',2,'previousMargin',3],[],e,s,gg)
var o4B=_v()
_(c3B,o4B)
var l5B=function(t7B,a6B,e8B,gg){
var o0B=_v()
_(e8B,o0B)
if(_oz(z,9,t7B,a6B,gg)){o0B.wxVkey=1
}
o0B.wxXCkey=1
return e8B
}
o4B.wxXCkey=2
_2z(z,7,l5B,e,s,gg,o4B,'itemName','idx','movielist')
_(fYB,c3B)
var h1B=_v()
_(fYB,h1B)
if(_oz(z,10,e,s,gg)){h1B.wxVkey=1
}
var o2B=_v()
_(fYB,o2B)
if(_oz(z,11,e,s,gg)){o2B.wxVkey=1
}
var xAC=_n('view')
_rz(z,xAC,'class',12,e,s,gg)
var oBC=_v()
_(xAC,oBC)
if(_oz(z,13,e,s,gg)){oBC.wxVkey=1
}
var fCC=_v()
_(xAC,fCC)
if(_oz(z,14,e,s,gg)){fCC.wxVkey=1
}
var cDC=_v()
_(xAC,cDC)
var hEC=function(cGC,oFC,oHC,gg){
var aJC=_v()
_(oHC,aJC)
if(_oz(z,19,cGC,oFC,gg)){aJC.wxVkey=1
var tKC=_mz(z,'view',['bindtap',20,'class',1,'hidden',2,'id',3],[],cGC,oFC,gg)
var eLC=_v()
_(tKC,eLC)
if(_oz(z,24,cGC,oFC,gg)){eLC.wxVkey=1
}
var bMC=_v()
_(tKC,bMC)
var oNC=function(oPC,xOC,fQC,gg){
var hSC=_mz(z,'view',['catchtap',29,'class',1,'data-index',2],[],oPC,xOC,gg)
var oTC=_v()
_(hSC,oTC)
if(_oz(z,32,oPC,xOC,gg)){oTC.wxVkey=1
}
oTC.wxXCkey=1
_(fQC,hSC)
return fQC
}
bMC.wxXCkey=2
_2z(z,27,oNC,cGC,oFC,gg,bMC,'channels_','index_','item')
eLC.wxXCkey=1
_(aJC,tKC)
}
aJC.wxXCkey=1
return oHC
}
cDC.wxXCkey=2
_2z(z,17,hEC,e,s,gg,cDC,'item','idx','item')
oBC.wxXCkey=1
fCC.wxXCkey=1
_(fYB,xAC)
h1B.wxXCkey=1
o2B.wxXCkey=1
}
else{fYB.wxVkey=2
}
var cZB=_v()
_(r,cZB)
if(_oz(z,33,e,s,gg)){cZB.wxVkey=1
var cUC=_mz(z,'loginsheet',['bind:hideSheet',34,'bind:loginend',1],[],e,s,gg)
_(cZB,cUC)
}
fYB.wxXCkey=1
cZB.wxXCkey=1
cZB.wxXCkey=3
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
var lWC=_v()
_(r,lWC)
if(_oz(z,0,e,s,gg)){lWC.wxVkey=1
}
var tYC=_n('view')
_rz(z,tYC,'class',1,e,s,gg)
var eZC=_v()
_(tYC,eZC)
if(_oz(z,2,e,s,gg)){eZC.wxVkey=1
}
else{eZC.wxVkey=2
var b1C=_v()
_(eZC,b1C)
if(_oz(z,3,e,s,gg)){b1C.wxVkey=1
var f5C=_v()
_(b1C,f5C)
if(_oz(z,4,e,s,gg)){f5C.wxVkey=1
}
f5C.wxXCkey=1
}
var o2C=_v()
_(eZC,o2C)
if(_oz(z,5,e,s,gg)){o2C.wxVkey=1
}
var x3C=_v()
_(eZC,x3C)
if(_oz(z,6,e,s,gg)){x3C.wxVkey=1
var c6C=_v()
_(x3C,c6C)
if(_oz(z,7,e,s,gg)){c6C.wxVkey=1
}
c6C.wxXCkey=1
}
var o4C=_v()
_(eZC,o4C)
if(_oz(z,8,e,s,gg)){o4C.wxVkey=1
var h7C=_mz(z,'scroll-view',['scrollY',-1,'class',9,'style',1],[],e,s,gg)
var o8C=_v()
_(h7C,o8C)
if(_oz(z,11,e,s,gg)){o8C.wxVkey=1
var o0C=_v()
_(o8C,o0C)
var lAD=function(tCD,aBD,eDD,gg){
var oFD=_mz(z,'view',['bindtap',14,'class',1,'data-etype',2,'data-name',3],[],tCD,aBD,gg)
var xGD=_v()
_(oFD,xGD)
if(_oz(z,18,tCD,aBD,gg)){xGD.wxVkey=1
}
xGD.wxXCkey=1
_(eDD,oFD)
return eDD
}
o0C.wxXCkey=2
_2z(z,12,lAD,e,s,gg,o0C,'item','index','item')
}
var c9C=_v()
_(h7C,c9C)
if(_oz(z,19,e,s,gg)){c9C.wxVkey=1
var oHD=_v()
_(c9C,oHD)
var fID=function(hKD,cJD,oLD,gg){
var oND=_mz(z,'view',['bindtap',22,'class',1,'data-name',2,'data-text',3],[],hKD,cJD,gg)
var lOD=_v()
_(oND,lOD)
if(_oz(z,26,hKD,cJD,gg)){lOD.wxVkey=1
}
lOD.wxXCkey=1
_(oLD,oND)
return oLD
}
oHD.wxXCkey=2
_2z(z,20,fID,e,s,gg,oHD,'item','index','item')
}
o8C.wxXCkey=1
c9C.wxXCkey=1
_(o4C,h7C)
}
var aPD=_n('view')
_rz(z,aPD,'class',27,e,s,gg)
var tQD=_v()
_(aPD,tQD)
if(_oz(z,28,e,s,gg)){tQD.wxVkey=1
}
var eRD=_mz(z,'cinamerlist',['cinamer',29,'iconShoucangjiaobiao',1,'iconTuijianjiaobiao',2,'iconfont',3],[],e,s,gg)
_(aPD,eRD)
tQD.wxXCkey=1
_(eZC,aPD)
b1C.wxXCkey=1
o2C.wxXCkey=1
x3C.wxXCkey=1
o4C.wxXCkey=1
}
eZC.wxXCkey=1
eZC.wxXCkey=3
_(r,tYC)
var aXC=_v()
_(r,aXC)
if(_oz(z,33,e,s,gg)){aXC.wxVkey=1
}
lWC.wxXCkey=1
aXC.wxXCkey=1
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
var oTD=_v()
_(r,oTD)
var xUD=function(fWD,oVD,cXD,gg){
var oZD=_v()
_(cXD,oZD)
var c1D=function(l3D,o2D,a4D,gg){
var e6D=_v()
_(a4D,e6D)
if(_oz(z,8,l3D,o2D,gg)){e6D.wxVkey=1
}
e6D.wxXCkey=1
return a4D
}
oZD.wxXCkey=2
_2z(z,6,c1D,fWD,oVD,gg,oZD,'itemName','idx','{{itemName.cityname}}')
return cXD
}
oTD.wxXCkey=2
_2z(z,2,xUD,e,s,gg,oTD,'itemName1','idx','{{itemName1.itemName1}}')
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
d_[x[12]]={}
var m12=function(e,s,r,gg){
var z=gz$gwx_13()
return r
}
e_[x[12]]={f:m12,j:[],i:[],ti:[],ic:[]}
d_[x[13]]={}
var m13=function(e,s,r,gg){
var z=gz$gwx_14()
return r
}
e_[x[13]]={f:m13,j:[],i:[],ti:[],ic:[]}
d_[x[14]]={}
var m14=function(e,s,r,gg){
var z=gz$gwx_15()
var o0D=_n('view')
_rz(z,o0D,'class',0,e,s,gg)
var fAE=_v()
_(o0D,fAE)
if(_oz(z,1,e,s,gg)){fAE.wxVkey=1
var cBE=_v()
_(fAE,cBE)
var hCE=function(cEE,oDE,oFE,gg){
var aHE=_v()
_(oFE,aHE)
if(_oz(z,4,cEE,oDE,gg)){aHE.wxVkey=1
var tIE=_v()
_(aHE,tIE)
var eJE=function(oLE,bKE,xME,gg){
var fOE=_mz(z,'movielist',['from',9,'movie',1],[],oLE,bKE,gg)
_(xME,fOE)
return xME
}
tIE.wxXCkey=4
_2z(z,7,eJE,cEE,oDE,gg,tIE,'item_','index','item')
}
aHE.wxXCkey=1
aHE.wxXCkey=3
return oFE
}
cBE.wxXCkey=4
_2z(z,2,hCE,e,s,gg,cBE,'item','index','item')
}
else{fAE.wxVkey=2
}
fAE.wxXCkey=1
fAE.wxXCkey=3
_(r,o0D)
return r
}
e_[x[14]]={f:m14,j:[],i:[],ti:[],ic:[]}
d_[x[15]]={}
var m15=function(e,s,r,gg){
var z=gz$gwx_16()
return r
}
e_[x[15]]={f:m15,j:[],i:[],ti:[],ic:[]}
d_[x[16]]={}
var m16=function(e,s,r,gg){
var z=gz$gwx_17()
var oRE=_n('view')
_rz(z,oRE,'class',0,e,s,gg)
var cSE=_v()
_(oRE,cSE)
if(_oz(z,1,e,s,gg)){cSE.wxVkey=1
}
var oTE=_v()
_(oRE,oTE)
if(_oz(z,2,e,s,gg)){oTE.wxVkey=1
var lUE=_mz(z,'loginsheet',['bind:hideSheet',3,'bind:loginend',1],[],e,s,gg)
_(oTE,lUE)
}
cSE.wxXCkey=1
oTE.wxXCkey=1
oTE.wxXCkey=3
_(r,oRE)
return r
}
e_[x[16]]={f:m16,j:[],i:[],ti:[],ic:[]}
d_[x[17]]={}
var m17=function(e,s,r,gg){
var z=gz$gwx_18()
var eXE=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
var bYE=_v()
_(eXE,bYE)
if(_oz(z,2,e,s,gg)){bYE.wxVkey=1
}
var oZE=_v()
_(eXE,oZE)
if(_oz(z,3,e,s,gg)){oZE.wxVkey=1
var c4E=_n('view')
_rz(z,c4E,'class',4,e,s,gg)
var h5E=_v()
_(c4E,h5E)
if(_oz(z,5,e,s,gg)){h5E.wxVkey=1
}
var o6E=_v()
_(c4E,o6E)
if(_oz(z,6,e,s,gg)){o6E.wxVkey=1
}
var c7E=_n('view')
_rz(z,c7E,'class',7,e,s,gg)
var o8E=_v()
_(c7E,o8E)
if(_oz(z,8,e,s,gg)){o8E.wxVkey=1
}
var l9E=_v()
_(c7E,l9E)
if(_oz(z,9,e,s,gg)){l9E.wxVkey=1
}
o8E.wxXCkey=1
l9E.wxXCkey=1
_(c4E,c7E)
h5E.wxXCkey=1
o6E.wxXCkey=1
_(oZE,c4E)
}
var x1E=_v()
_(eXE,x1E)
if(_oz(z,10,e,s,gg)){x1E.wxVkey=1
}
var o2E=_v()
_(eXE,o2E)
if(_oz(z,11,e,s,gg)){o2E.wxVkey=1
var a0E=_mz(z,'view',['class',12,'style',1],[],e,s,gg)
var tAF=_v()
_(a0E,tAF)
if(_oz(z,14,e,s,gg)){tAF.wxVkey=1
}
var eBF=_v()
_(a0E,eBF)
if(_oz(z,15,e,s,gg)){eBF.wxVkey=1
}
var bCF=_mz(z,'cinamerlist',['cinamer',16,'iconShoucangjiaobiao',1,'iconTuijianjiaobiao',2,'iconfont',3],[],e,s,gg)
_(a0E,bCF)
tAF.wxXCkey=1
eBF.wxXCkey=1
_(o2E,a0E)
}
var f3E=_v()
_(eXE,f3E)
if(_oz(z,20,e,s,gg)){f3E.wxVkey=1
var oDF=_n('view')
var xEF=_v()
_(oDF,xEF)
if(_oz(z,21,e,s,gg)){xEF.wxVkey=1
}
else{xEF.wxVkey=2
var hIF=_mz(z,'view',['bindtap',22,'class',1,'style',2],[],e,s,gg)
var oJF=_mz(z,'view',['class',25,'style',1],[],e,s,gg)
var cKF=_v()
_(oJF,cKF)
if(_oz(z,27,e,s,gg)){cKF.wxVkey=1
}
var oLF=_v()
_(oJF,oLF)
if(_oz(z,28,e,s,gg)){oLF.wxVkey=1
}
cKF.wxXCkey=1
oLF.wxXCkey=1
_(hIF,oJF)
_(xEF,hIF)
var oFF=_v()
_(xEF,oFF)
if(_oz(z,29,e,s,gg)){oFF.wxVkey=1
var lMF=_v()
_(oFF,lMF)
var aNF=function(ePF,tOF,bQF,gg){
var xSF=_v()
_(bQF,xSF)
if(_oz(z,33,ePF,tOF,gg)){xSF.wxVkey=1
}
xSF.wxXCkey=1
return bQF
}
lMF.wxXCkey=2
_2z(z,31,aNF,e,s,gg,lMF,'item','i','actors')
}
var fGF=_v()
_(xEF,fGF)
if(_oz(z,34,e,s,gg)){fGF.wxVkey=1
var oTF=_mz(z,'scroll-view',['class',35,'scrollX',1,'style',2],[],e,s,gg)
var fUF=_v()
_(oTF,fUF)
if(_oz(z,38,e,s,gg)){fUF.wxVkey=1
}
var cVF=_v()
_(oTF,cVF)
var hWF=function(cYF,oXF,oZF,gg){
var a2F=_v()
_(oZF,a2F)
if(_oz(z,43,cYF,oXF,gg)){a2F.wxVkey=1
}
a2F.wxXCkey=1
return oZF
}
cVF.wxXCkey=2
_2z(z,41,hWF,e,s,gg,cVF,'i','a','{{img}}')
fUF.wxXCkey=1
_(fGF,oTF)
}
var cHF=_v()
_(xEF,cHF)
if(_oz(z,44,e,s,gg)){cHF.wxVkey=1
var t3F=_n('view')
_rz(z,t3F,'class',45,e,s,gg)
var e4F=_v()
_(t3F,e4F)
if(_oz(z,46,e,s,gg)){e4F.wxVkey=1
}
var b5F=_v()
_(t3F,b5F)
if(_oz(z,47,e,s,gg)){b5F.wxVkey=1
}
var o6F=_v()
_(t3F,o6F)
if(_oz(z,48,e,s,gg)){o6F.wxVkey=1
}
var x7F=_v()
_(t3F,x7F)
if(_oz(z,49,e,s,gg)){x7F.wxVkey=1
}
e4F.wxXCkey=1
b5F.wxXCkey=1
o6F.wxXCkey=1
x7F.wxXCkey=1
_(cHF,t3F)
}
var o8F=_n('view')
_rz(z,o8F,'class',50,e,s,gg)
var f9F=_v()
_(o8F,f9F)
if(_oz(z,51,e,s,gg)){f9F.wxVkey=1
}
var c0F=_v()
_(o8F,c0F)
var hAG=function(cCG,oBG,oDG,gg){
var aFG=_v()
_(oDG,aFG)
if(_oz(z,55,cCG,oBG,gg)){aFG.wxVkey=1
}
aFG.wxXCkey=1
return oDG
}
c0F.wxXCkey=2
_2z(z,53,hAG,e,s,gg,c0F,'item','index','{{item.id}}')
f9F.wxXCkey=1
_(xEF,o8F)
oFF.wxXCkey=1
fGF.wxXCkey=1
cHF.wxXCkey=1
}
xEF.wxXCkey=1
_(f3E,oDF)
}
var tGG=_mz(z,'scroll-view',['scrollY',-1,'style',56],[],e,s,gg)
var eHG=_mz(z,'view',['bindtap',57,'class',1,'data-areaname',2,'style',3],[],e,s,gg)
var bIG=_v()
_(eHG,bIG)
if(_oz(z,61,e,s,gg)){bIG.wxVkey=1
}
bIG.wxXCkey=1
_(tGG,eHG)
var oJG=_v()
_(tGG,oJG)
var xKG=function(fMG,oLG,cNG,gg){
var oPG=_mz(z,'view',['bindtap',64,'class',1,'data-areaname',2,'style',3],[],fMG,oLG,gg)
var cQG=_v()
_(oPG,cQG)
if(_oz(z,68,fMG,oLG,gg)){cQG.wxVkey=1
}
cQG.wxXCkey=1
_(cNG,oPG)
return cNG
}
oJG.wxXCkey=2
_2z(z,62,xKG,e,s,gg,oJG,'item','index','{{item.regionname}}')
_(eXE,tGG)
bYE.wxXCkey=1
oZE.wxXCkey=1
x1E.wxXCkey=1
o2E.wxXCkey=1
o2E.wxXCkey=3
f3E.wxXCkey=1
_(r,eXE)
var tWE=_v()
_(r,tWE)
if(_oz(z,69,e,s,gg)){tWE.wxVkey=1
var oRG=_mz(z,'loginsheet',['bind:hideSheet',70,'bind:loginend',1],[],e,s,gg)
_(tWE,oRG)
}
tWE.wxXCkey=1
tWE.wxXCkey=3
return r
}
e_[x[17]]={f:m17,j:[],i:[],ti:[],ic:[]}
d_[x[18]]={}
var m18=function(e,s,r,gg){
var z=gz$gwx_19()
var aTG=_n('view')
_rz(z,aTG,'class',0,e,s,gg)
var tUG=_v()
_(aTG,tUG)
if(_oz(z,1,e,s,gg)){tUG.wxVkey=1
var bWG=_v()
_(tUG,bWG)
var oXG=function(oZG,xYG,f1G,gg){
var h3G=_n('movielist')
_rz(z,h3G,'movie',4,oZG,xYG,gg)
_(f1G,h3G)
return f1G
}
bWG.wxXCkey=4
_2z(z,2,oXG,e,s,gg,bWG,'item','index','item')
}
var eVG=_v()
_(aTG,eVG)
if(_oz(z,5,e,s,gg)){eVG.wxVkey=1
var o4G=_v()
_(eVG,o4G)
var c5G=function(l7G,o6G,a8G,gg){
var e0G=_v()
_(a8G,e0G)
var bAH=function(xCH,oBH,oDH,gg){
var cFH=_mz(z,'movielist',['bind:likemovie',10,'movie',1],[],xCH,oBH,gg)
_(oDH,cFH)
return oDH
}
e0G.wxXCkey=4
_2z(z,8,bAH,l7G,o6G,gg,e0G,'item','index','item')
return a8G
}
o4G.wxXCkey=4
_2z(z,6,c5G,e,s,gg,o4G,'item','index','item')
}
tUG.wxXCkey=1
tUG.wxXCkey=3
eVG.wxXCkey=1
eVG.wxXCkey=3
_(r,aTG)
return r
}
e_[x[18]]={f:m18,j:[],i:[],ti:[],ic:[]}
d_[x[19]]={}
var m19=function(e,s,r,gg){
var z=gz$gwx_20()
var cIH=_n('view')
_rz(z,cIH,'class',0,e,s,gg)
var lKH=_n('view')
_rz(z,lKH,'class',1,e,s,gg)
var aLH=_v()
_(lKH,aLH)
if(_oz(z,2,e,s,gg)){aLH.wxVkey=1
}
var tMH=_v()
_(lKH,tMH)
if(_oz(z,3,e,s,gg)){tMH.wxVkey=1
}
var eNH=_v()
_(lKH,eNH)
if(_oz(z,4,e,s,gg)){eNH.wxVkey=1
}
var bOH=_v()
_(lKH,bOH)
if(_oz(z,5,e,s,gg)){bOH.wxVkey=1
}
var oPH=_v()
_(lKH,oPH)
if(_oz(z,6,e,s,gg)){oPH.wxVkey=1
}
aLH.wxXCkey=1
tMH.wxXCkey=1
eNH.wxXCkey=1
bOH.wxXCkey=1
oPH.wxXCkey=1
_(cIH,lKH)
var oJH=_v()
_(cIH,oJH)
if(_oz(z,7,e,s,gg)){oJH.wxVkey=1
}
var xQH=_mz(z,'scroll-view',['bindscrolltolower',8,'scrollY',1,'style',2],[],e,s,gg)
var oRH=_v()
_(xQH,oRH)
var fSH=function(hUH,cTH,oVH,gg){
var oXH=_mz(z,'coupon',['data',13,'iconDianyingquan',1,'iconfont',2],[],hUH,cTH,gg)
_(oVH,oXH)
return oVH
}
oRH.wxXCkey=4
_2z(z,11,fSH,e,s,gg,oRH,'item','index','item')
_(cIH,xQH)
oJH.wxXCkey=1
_(r,cIH)
var oHH=_v()
_(r,oHH)
if(_oz(z,16,e,s,gg)){oHH.wxVkey=1
}
oHH.wxXCkey=1
return r
}
e_[x[19]]={f:m19,j:[],i:[],ti:[],ic:[]}
d_[x[20]]={}
var m20=function(e,s,r,gg){
var z=gz$gwx_21()
var aZH=_n('view')
_rz(z,aZH,'class',0,e,s,gg)
var e2H=_v()
_(aZH,e2H)
var b3H=function(x5H,o4H,o6H,gg){
var c8H=_v()
_(o6H,c8H)
var h9H=function(cAI,o0H,oBI,gg){
var aDI=_v()
_(oBI,aDI)
if(_oz(z,9,cAI,o0H,gg)){aDI.wxVkey=1
var tEI=_v()
_(aDI,tEI)
if(_oz(z,10,cAI,o0H,gg)){tEI.wxVkey=1
}
tEI.wxXCkey=1
}
else{aDI.wxVkey=2
}
aDI.wxXCkey=1
return oBI
}
c8H.wxXCkey=2
_2z(z,7,h9H,x5H,o4H,gg,c8H,'item1','indx','item.buytime')
return o6H
}
e2H.wxXCkey=2
_2z(z,3,b3H,e,s,gg,e2H,'item','index','item')
var t1H=_v()
_(aZH,t1H)
if(_oz(z,11,e,s,gg)){t1H.wxVkey=1
}
t1H.wxXCkey=1
_(r,aZH)
return r
}
e_[x[20]]={f:m20,j:[],i:[],ti:[],ic:[]}
d_[x[21]]={}
var m21=function(e,s,r,gg){
var z=gz$gwx_22()
var oHI=_n('view')
_rz(z,oHI,'class',0,e,s,gg)
var xII=_v()
_(oHI,xII)
if(_oz(z,1,e,s,gg)){xII.wxVkey=1
var fKI=_n('view')
_rz(z,fKI,'class',2,e,s,gg)
var hMI=_n('view')
_rz(z,hMI,'class',3,e,s,gg)
var oNI=_v()
_(hMI,oNI)
if(_oz(z,4,e,s,gg)){oNI.wxVkey=1
}
else{oNI.wxVkey=2
var cOI=_v()
_(oNI,cOI)
if(_oz(z,5,e,s,gg)){cOI.wxVkey=1
}
cOI.wxXCkey=1
}
oNI.wxXCkey=1
_(fKI,hMI)
var cLI=_v()
_(fKI,cLI)
if(_oz(z,6,e,s,gg)){cLI.wxVkey=1
}
cLI.wxXCkey=1
_(xII,fKI)
}
var oPI=_n('view')
_rz(z,oPI,'class',7,e,s,gg)
var lQI=_mz(z,'view',['class',8,'style',1],[],e,s,gg)
var aRI=_v()
_(lQI,aRI)
if(_oz(z,10,e,s,gg)){aRI.wxVkey=1
}
var tSI=_v()
_(lQI,tSI)
if(_oz(z,11,e,s,gg)){tSI.wxVkey=1
}
var eTI=_v()
_(lQI,eTI)
if(_oz(z,12,e,s,gg)){eTI.wxVkey=1
}
var bUI=_v()
_(lQI,bUI)
if(_oz(z,13,e,s,gg)){bUI.wxVkey=1
}
aRI.wxXCkey=1
tSI.wxXCkey=1
eTI.wxXCkey=1
bUI.wxXCkey=1
_(oPI,lQI)
var oVI=_n('view')
_rz(z,oVI,'class',14,e,s,gg)
var xWI=_v()
_(oVI,xWI)
if(_oz(z,15,e,s,gg)){xWI.wxVkey=1
}
var oXI=_v()
_(oVI,oXI)
if(_oz(z,16,e,s,gg)){oXI.wxVkey=1
}
var fYI=_v()
_(oVI,fYI)
if(_oz(z,17,e,s,gg)){fYI.wxVkey=1
}
xWI.wxXCkey=1
oXI.wxXCkey=1
fYI.wxXCkey=1
_(oPI,oVI)
_(oHI,oPI)
var oJI=_v()
_(oHI,oJI)
if(_oz(z,18,e,s,gg)){oJI.wxVkey=1
}
xII.wxXCkey=1
oJI.wxXCkey=1
_(r,oHI)
var bGI=_v()
_(r,bGI)
if(_oz(z,19,e,s,gg)){bGI.wxVkey=1
var cZI=_v()
_(bGI,cZI)
if(_oz(z,20,e,s,gg)){cZI.wxVkey=1
}
var h1I=_v()
_(bGI,h1I)
if(_oz(z,21,e,s,gg)){h1I.wxVkey=1
}
var o2I=_v()
_(bGI,o2I)
if(_oz(z,22,e,s,gg)){o2I.wxVkey=1
var c3I=_mz(z,'share-canvas',['bind:draw',23,'font_color',1,'group_price',2,'movie_name',3,'movie_pic',4,'price',5],[],e,s,gg)
_(o2I,c3I)
}
cZI.wxXCkey=1
h1I.wxXCkey=1
o2I.wxXCkey=1
o2I.wxXCkey=3
}
bGI.wxXCkey=1
bGI.wxXCkey=3
return r
}
e_[x[21]]={f:m21,j:[],i:[],ti:[],ic:[]}
d_[x[22]]={}
var m22=function(e,s,r,gg){
var z=gz$gwx_23()
var l5I=_n('view')
_rz(z,l5I,'class',0,e,s,gg)
var a6I=_n('view')
_rz(z,a6I,'class',1,e,s,gg)
var t7I=_v()
_(a6I,t7I)
if(_oz(z,2,e,s,gg)){t7I.wxVkey=1
}
var e8I=_v()
_(a6I,e8I)
if(_oz(z,3,e,s,gg)){e8I.wxVkey=1
}
t7I.wxXCkey=1
e8I.wxXCkey=1
_(l5I,a6I)
var b9I=_mz(z,'action-sheet',['bindchange',4,'hidden',1,'style',2],[],e,s,gg)
var o0I=_v()
_(b9I,o0I)
if(_oz(z,7,e,s,gg)){o0I.wxVkey=1
var oBJ=_v()
_(o0I,oBJ)
if(_oz(z,8,e,s,gg)){oBJ.wxVkey=1
var cDJ=_n('view')
var hEJ=_v()
_(cDJ,hEJ)
if(_oz(z,9,e,s,gg)){hEJ.wxVkey=1
}
var oFJ=_mz(z,'scroll-view',['bindscrolltolower',10,'scrollY',1,'style',2],[],e,s,gg)
var cGJ=_v()
_(oFJ,cGJ)
var oHJ=function(aJJ,lIJ,tKJ,gg){
var bMJ=_mz(z,'coupon',['bind:radioChange',15,'data',1,'iconDianyingquan',2,'iconDizhixuanzhong',3,'iconfont',4],[],aJJ,lIJ,gg)
_(tKJ,bMJ)
return tKJ
}
cGJ.wxXCkey=4
_2z(z,13,oHJ,e,s,gg,cGJ,'item','index','item')
_(cDJ,oFJ)
hEJ.wxXCkey=1
_(oBJ,cDJ)
}
var fCJ=_v()
_(o0I,fCJ)
if(_oz(z,20,e,s,gg)){fCJ.wxVkey=1
}
oBJ.wxXCkey=1
oBJ.wxXCkey=3
fCJ.wxXCkey=1
}
var xAJ=_v()
_(b9I,xAJ)
if(_oz(z,21,e,s,gg)){xAJ.wxVkey=1
var oNJ=_n('view')
_rz(z,oNJ,'class',22,e,s,gg)
var xOJ=_v()
_(oNJ,xOJ)
if(_oz(z,23,e,s,gg)){xOJ.wxVkey=1
}
var oPJ=_v()
_(oNJ,oPJ)
if(_oz(z,24,e,s,gg)){oPJ.wxVkey=1
}
xOJ.wxXCkey=1
oPJ.wxXCkey=1
_(xAJ,oNJ)
var fQJ=_n('view')
_rz(z,fQJ,'class',25,e,s,gg)
var cRJ=_v()
_(fQJ,cRJ)
if(_oz(z,26,e,s,gg)){cRJ.wxVkey=1
}
var hSJ=_mz(z,'scroll-view',['scrollY',27,'style',1],[],e,s,gg)
var oTJ=_v()
_(hSJ,oTJ)
if(_oz(z,29,e,s,gg)){oTJ.wxVkey=1
var oVJ=_v()
_(oTJ,oVJ)
var lWJ=function(tYJ,aXJ,eZJ,gg){
var o2J=_mz(z,'moviecard',['bind:usecard',32,'card',1,'iconDizhixuanzhong',2,'iconfont',3],[],tYJ,aXJ,gg)
_(eZJ,o2J)
return eZJ
}
oVJ.wxXCkey=4
_2z(z,30,lWJ,e,s,gg,oVJ,'item','index','item')
}
var cUJ=_v()
_(hSJ,cUJ)
if(_oz(z,36,e,s,gg)){cUJ.wxVkey=1
}
oTJ.wxXCkey=1
oTJ.wxXCkey=3
cUJ.wxXCkey=1
_(fQJ,hSJ)
cRJ.wxXCkey=1
_(xAJ,fQJ)
}
o0I.wxXCkey=1
o0I.wxXCkey=3
xAJ.wxXCkey=1
xAJ.wxXCkey=3
_(l5I,b9I)
_(r,l5I)
return r
}
e_[x[22]]={f:m22,j:[],i:[],ti:[],ic:[]}
d_[x[23]]={}
var m23=function(e,s,r,gg){
var z=gz$gwx_24()
var o4J=_v()
_(r,o4J)
var f5J=function(h7J,c6J,o8J,gg){
var o0J=_v()
_(o8J,o0J)
if(_oz(z,3,h7J,c6J,gg)){o0J.wxVkey=1
}
o0J.wxXCkey=1
return o8J
}
o4J.wxXCkey=2
_2z(z,1,f5J,e,s,gg,o4J,'i','index','{{i}}')
return r
}
e_[x[23]]={f:m23,j:[],i:[],ti:[],ic:[]}
d_[x[24]]={}
var m24=function(e,s,r,gg){
var z=gz$gwx_25()
return r
}
e_[x[24]]={f:m24,j:[],i:[],ti:[],ic:[]}
d_[x[25]]={}
var m25=function(e,s,r,gg){
var z=gz$gwx_26()
var tCK=_n('view')
_rz(z,tCK,'class',0,e,s,gg)
var eDK=_v()
_(tCK,eDK)
if(_oz(z,1,e,s,gg)){eDK.wxVkey=1
var bEK=_v()
_(eDK,bEK)
var oFK=function(oHK,xGK,fIK,gg){
var hKK=_v()
_(fIK,hKK)
if(_oz(z,5,oHK,xGK,gg)){hKK.wxVkey=1
var oLK=_mz(z,'view',['bindtap',6,'class',1,'data-hot',2],[],oHK,xGK,gg)
var cMK=_v()
_(oLK,cMK)
if(_oz(z,9,oHK,xGK,gg)){cMK.wxVkey=1
}
var oNK=_v()
_(oLK,oNK)
if(_oz(z,10,oHK,xGK,gg)){oNK.wxVkey=1
}
var lOK=_v()
_(oLK,lOK)
if(_oz(z,11,oHK,xGK,gg)){lOK.wxVkey=1
}
cMK.wxXCkey=1
oNK.wxXCkey=1
lOK.wxXCkey=1
_(hKK,oLK)
}
hKK.wxXCkey=1
return fIK
}
bEK.wxXCkey=2
_2z(z,3,oFK,e,s,gg,bEK,'item','i','item')
}
var aPK=_v()
_(tCK,aPK)
var tQK=function(bSK,eRK,oTK,gg){
var oVK=_n('movielist')
_rz(z,oVK,'movie',14,bSK,eRK,gg)
_(oTK,oVK)
return oTK
}
aPK.wxXCkey=4
_2z(z,12,tQK,e,s,gg,aPK,'item','index','item')
var fWK=_n('cinamerlist')
_rz(z,fWK,'cinamer',15,e,s,gg)
_(tCK,fWK)
eDK.wxXCkey=1
_(r,tCK)
return r
}
e_[x[25]]={f:m25,j:[],i:[],ti:[],ic:[]}
d_[x[26]]={}
var m26=function(e,s,r,gg){
var z=gz$gwx_27()
var hYK=_v()
_(r,hYK)
if(_oz(z,0,e,s,gg)){hYK.wxVkey=1
}
var oZK=_v()
_(r,oZK)
if(_oz(z,1,e,s,gg)){oZK.wxVkey=1
}
var a4K=_mz(z,'movable-view',['scale',-1,'bindchange',2,'bindscale',1,'direction',2,'id',3,'scaleMax',4,'scaleMin',5,'scaleValue',6,'style',7,'x',8,'y',9],[],e,s,gg)
var t5K=_v()
_(a4K,t5K)
if(_oz(z,12,e,s,gg)){t5K.wxVkey=1
}
var e6K=_v()
_(a4K,e6K)
var b7K=function(x9K,o8K,o0K,gg){
var cBL=_v()
_(o0K,cBL)
var hCL=function(cEL,oDL,oFL,gg){
var aHL=_v()
_(oFL,aHL)
if(_oz(z,21,cEL,oDL,gg)){aHL.wxVkey=1
var tIL=_mz(z,'view',['bindtap',22,'class',1,'data-seat',2],[],cEL,oDL,gg)
var eJL=_v()
_(tIL,eJL)
if(_oz(z,25,cEL,oDL,gg)){eJL.wxVkey=1
}
eJL.wxXCkey=1
_(aHL,tIL)
}
else if(_oz(z,26,cEL,oDL,gg)){aHL.wxVkey=2
var bKL=_mz(z,'view',['catchtap',27,'class',1,'data-seat',2],[],cEL,oDL,gg)
var oLL=_v()
_(bKL,oLL)
if(_oz(z,30,cEL,oDL,gg)){oLL.wxVkey=1
}
oLL.wxXCkey=1
_(aHL,bKL)
}
else if(_oz(z,31,cEL,oDL,gg)){aHL.wxVkey=3
var xML=_mz(z,'view',['catchtap',32,'class',1,'data-seat',2],[],cEL,oDL,gg)
var oNL=_v()
_(xML,oNL)
if(_oz(z,35,cEL,oDL,gg)){oNL.wxVkey=1
}
oNL.wxXCkey=1
_(aHL,xML)
}
else{aHL.wxVkey=4
}
aHL.wxXCkey=1
return oFL
}
cBL.wxXCkey=2
_2z(z,19,hCL,x9K,o8K,gg,cBL,'j','j','seatdata')
return o0K
}
e6K.wxXCkey=2
_2z(z,15,b7K,e,s,gg,e6K,'i','i','seatitem')
t5K.wxXCkey=1
_(r,a4K)
var c1K=_v()
_(r,c1K)
if(_oz(z,36,e,s,gg)){c1K.wxVkey=1
}
var o2K=_v()
_(r,o2K)
if(_oz(z,37,e,s,gg)){o2K.wxVkey=1
}
var l3K=_v()
_(r,l3K)
if(_oz(z,38,e,s,gg)){l3K.wxVkey=1
}
var fOL=_mz(z,'view',['bindtap',39,'class',1,'hidden',2],[],e,s,gg)
var cPL=_v()
_(fOL,cPL)
var hQL=function(cSL,oRL,oTL,gg){
var aVL=_v()
_(oTL,aVL)
if(_oz(z,46,cSL,oRL,gg)){aVL.wxVkey=1
var tWL=_mz(z,'view',['catchtap',47,'class',1,'data-playData',2],[],cSL,oRL,gg)
var eXL=_v()
_(tWL,eXL)
if(_oz(z,50,cSL,oRL,gg)){eXL.wxVkey=1
}
eXL.wxXCkey=1
_(aVL,tWL)
}
aVL.wxXCkey=1
return oTL
}
cPL.wxXCkey=2
_2z(z,44,hQL,e,s,gg,cPL,'item','idx','playdata')
_(r,fOL)
hYK.wxXCkey=1
oZK.wxXCkey=1
c1K.wxXCkey=1
o2K.wxXCkey=1
l3K.wxXCkey=1
return r
}
e_[x[26]]={f:m26,j:[],i:[],ti:[],ic:[]}
d_[x[27]]={}
var m27=function(e,s,r,gg){
var z=gz$gwx_28()
return r
}
e_[x[27]]={f:m27,j:[],i:[],ti:[],ic:[]}
d_[x[28]]={}
var m28=function(e,s,r,gg){
var z=gz$gwx_29()
var x1L=_n('view')
_rz(z,x1L,'class',0,e,s,gg)
var o2L=_v()
_(x1L,o2L)
if(_oz(z,1,e,s,gg)){o2L.wxVkey=1
}
var f3L=_v()
_(x1L,f3L)
var c4L=function(o6L,h5L,c7L,gg){
var l9L=_v()
_(c7L,l9L)
if(_oz(z,4,o6L,h5L,gg)){l9L.wxVkey=1
var a0L=_mz(z,'moviecard',['bind:cardview',5,'card',1],[],o6L,h5L,gg)
_(l9L,a0L)
}
l9L.wxXCkey=1
l9L.wxXCkey=3
return c7L
}
f3L.wxXCkey=4
_2z(z,2,c4L,e,s,gg,f3L,'item','index','item')
o2L.wxXCkey=1
_(r,x1L)
return r
}
e_[x[28]]={f:m28,j:[],i:[],ti:[],ic:[]}
d_[x[29]]={}
var m29=function(e,s,r,gg){
var z=gz$gwx_30()
return r
}
e_[x[29]]={f:m29,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}
	__wxAppCode__['component/cinamerlist/cinamerlist.json'] = {"component":true,"usingComponents":{}};
		__wxAppCode__['component/cinamerlist/cinamerlist.wxml'] = $gwx( './component/cinamerlist/cinamerlist.wxml' );
		__wxAppCode__['component/coupon/coupon.json'] = {"component":true,"usingComponents":{}};
		__wxAppCode__['component/coupon/coupon.wxml'] = $gwx( './component/coupon/coupon.wxml' );
		__wxAppCode__['component/loginsheet/loginsheet.json'] = {"component":true,"usingComponents":{}};
		__wxAppCode__['component/loginsheet/loginsheet.wxml'] = $gwx( './component/loginsheet/loginsheet.wxml' );
		__wxAppCode__['component/moviecard/moviecard.json'] = {"component":true,"usingComponents":{}};
		__wxAppCode__['component/moviecard/moviecard.wxml'] = $gwx( './component/moviecard/moviecard.wxml' );
		__wxAppCode__['component/movielist/movielist.json'] = {"component":true,"usingComponents":{"loginsheet":"/component/loginsheet/loginsheet"}};
		__wxAppCode__['component/movielist/movielist.wxml'] = $gwx( './component/movielist/movielist.wxml' );
		__wxAppCode__['component/sharecanvas/sharecanvas.json'] = {"component":true,"usingComponents":{}};
		__wxAppCode__['component/sharecanvas/sharecanvas.wxml'] = $gwx( './component/sharecanvas/sharecanvas.wxml' );
		__wxAppCode__['pages/cinamermoviedetails/cinamermoviedetails.json'] = {"navigationBarTitleText":"","enablePullDownRefresh":true,"backgroundTextStyle":"dark","usingComponents":{"loginsheet":"../../component/loginsheet/loginsheet"}};
		__wxAppCode__['pages/cinamermoviedetails/cinamermoviedetails.wxml'] = $gwx( './pages/cinamermoviedetails/cinamermoviedetails.wxml' );
		__wxAppCode__['pages/index/index.json'] = {"enablePullDownRefresh":true,"backgroundTextStyle":"light","navigationBarBackgroundColor":"#ff5500","backgroundColor":"#ff5500","navigationBarTextStyle":"white","usingComponents":{"cinamerlist":"../../component/cinamerlist/cinamerlist"}};
		__wxAppCode__['pages/index/index.wxml'] = $gwx( './pages/index/index.wxml' );
		__wxAppCode__['pages/likecinamer/likecinamer.json'] = {"navigationBarTitleText":"收藏的影院","usingComponents":{"cinamerlist":"../../component/cinamerlist/cinamerlist"}};
		__wxAppCode__['pages/likecinamer/likecinamer.wxml'] = $gwx( './pages/likecinamer/likecinamer.wxml' );
		__wxAppCode__['pages/likemovie/likemovie.json'] = {"navigationBarTitleText":"想看的影片","usingComponents":{"movielist":"../../component/movielist/movielist"}};
		__wxAppCode__['pages/likemovie/likemovie.wxml'] = $gwx( './pages/likemovie/likemovie.wxml' );
		__wxAppCode__['pages/mine/mine.json'] = {"navigationBarTitleText":"我的","navigationBarTextStyle":"#fff","usingComponents":{"loginsheet":"../../component/loginsheet/loginsheet"}};
		__wxAppCode__['pages/mine/mine.wxml'] = $gwx( './pages/mine/mine.wxml' );
		__wxAppCode__['pages/moviedetail/moviedetail.json'] = {"navigationBarTitleText":"影片详情","enablePullDownRefresh":true,"backgroundTextStyle":"dark","usingComponents":{"cinamerlist":"../../component/cinamerlist/cinamerlist","loginsheet":"../../component/loginsheet/loginsheet"}};
		__wxAppCode__['pages/moviedetail/moviedetail.wxml'] = $gwx( './pages/moviedetail/moviedetail.wxml' );
		__wxAppCode__['pages/movies/movies.json'] = {"enablePullDownRefresh":true,"backgroundTextStyle":"dark","navigationBarTitleText":"影片","usingComponents":{"movielist":"../../component/movielist/movielist"}};
		__wxAppCode__['pages/movies/movies.wxml'] = $gwx( './pages/movies/movies.wxml' );
		__wxAppCode__['pages/mycoupon/mycoupon.json'] = {"navigationBarTitleText":"我的票券","usingComponents":{"coupon":"/component/coupon/coupon"}};
		__wxAppCode__['pages/mycoupon/mycoupon.wxml'] = $gwx( './pages/mycoupon/mycoupon.wxml' );
		__wxAppCode__['pages/orderdetails/orderdetails.json'] = {"navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationBarTitleText":"订单详情","usingComponents":{"share-canvas":"../../../component/sharecanvas/sharecanvas"}};
		__wxAppCode__['pages/orderdetails/orderdetails.wxml'] = $gwx( './pages/orderdetails/orderdetails.wxml' );
		__wxAppCode__['pages/pay/pay.json'] = {"navigationBarTitleText":"确认订单","usingComponents":{"moviecard":"../../component/moviecard/moviecard","coupon":"../../component/coupon/coupon"}};
		__wxAppCode__['pages/pay/pay.wxml'] = $gwx( './pages/pay/pay.wxml' );
		__wxAppCode__['pages/search/search.json'] = {"navigationBarTitleText":"搜索","usingComponents":{"cinamerlist":"../../component/cinamerlist/cinamerlist","movielist":"../../component/movielist/movielist"}};
		__wxAppCode__['pages/search/search.wxml'] = $gwx( './pages/search/search.wxml' );
		__wxAppCode__['pages/viewCard/viewCard.json'] = {"navigationBarTitleText":"我的观影卡","usingComponents":{"moviecard":"../../component/moviecard/moviecard"}};
		__wxAppCode__['pages/viewCard/viewCard.wxml'] = $gwx( './pages/viewCard/viewCard.wxml' );
	
	define("lib/base64.min.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,o){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=o(e):"function"==typeof define&&define.amd?define(o):o(e)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0,function(global){var _Base64=global.Base64,version="2.5.0",buffer;if("undefined"!=typeof module&&module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var o={},r=0,t=e.length;r<t;r++)o[e.charAt(r)]=r;return o}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2)return(o=e.charCodeAt(0))<128?e:o<2048?fromCharCode(192|o>>>6)+fromCharCode(128|63&o):fromCharCode(224|o>>>12&15)+fromCharCode(128|o>>>6&63)+fromCharCode(128|63&o);var o=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|o>>>18&7)+fromCharCode(128|o>>>12&63)+fromCharCode(128|o>>>6&63)+fromCharCode(128|63&o)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var o=[0,2,1][e.length%3],r=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0);return[b64chars.charAt(r>>>18),b64chars.charAt(r>>>12&63),o>=2?"=":b64chars.charAt(r>>>6&63),o>=1?"=":b64chars.charAt(63&r)].join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,o){return o?_encode(String(e)).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var o=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return fromCharCode(55296+(o>>>10))+fromCharCode(56320+(1023&o));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var o=e.length,r=o%4,t=(o>0?b64tab[e.charAt(0)]<<18:0)|(o>1?b64tab[e.charAt(1)]<<12:0)|(o>2?b64tab[e.charAt(2)]<<6:0)|(o>3?b64tab[e.charAt(3)]:0),n=[fromCharCode(t>>>16),fromCharCode(t>>>8&255),fromCharCode(255&t)];return n.length-=[0,0,2,1][r],n.join("")},_atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/\S{1,4}/g,cb_decode)},atob=function(e){return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(_atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(e){return encode(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}return global.Meteor&&(Base64=global.Base64),"undefined"!=typeof module&&module.exports?module.exports.Base64=global.Base64:"function"==typeof define&&define.amd&&define([],function(){return global.Base64}),{Base64:global.Base64}}); 
 			}); 
		define("lib/md5.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function n(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function r(n,r){return n<<r|n>>>32-r}function t(t,e,u,o,c,f){return n(r(n(n(e,t),n(o,f)),c),u)}function e(n,r,e,u,o,c,f){return t(r&e|~r&u,n,r,o,c,f)}function u(n,r,e,u,o,c,f){return t(r&u|e&~u,n,r,o,c,f)}function o(n,r,e,u,o,c,f){return t(r^e^u,n,r,o,c,f)}function c(n,r,e,u,o,c,f){return t(e^(r|~u),n,r,o,c,f)}function f(r){for(var t=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<r.length;h+=16){var l=t,g=f,v=i,d=a;f=c(f=c(f=c(f=c(f=o(f=o(f=o(f=o(f=u(f=u(f=u(f=u(f=e(f=e(f=e(f=e(f,i=e(i,a=e(a,t=e(t,f,i,a,r[h+0],7,-680876936),f,i,r[h+1],12,-389564586),t,f,r[h+2],17,606105819),a,t,r[h+3],22,-1044525330),i=e(i,a=e(a,t=e(t,f,i,a,r[h+4],7,-176418897),f,i,r[h+5],12,1200080426),t,f,r[h+6],17,-1473231341),a,t,r[h+7],22,-45705983),i=e(i,a=e(a,t=e(t,f,i,a,r[h+8],7,1770035416),f,i,r[h+9],12,-1958414417),t,f,r[h+10],17,-42063),a,t,r[h+11],22,-1990404162),i=e(i,a=e(a,t=e(t,f,i,a,r[h+12],7,1804603682),f,i,r[h+13],12,-40341101),t,f,r[h+14],17,-1502002290),a,t,r[h+15],22,1236535329),i=u(i,a=u(a,t=u(t,f,i,a,r[h+1],5,-165796510),f,i,r[h+6],9,-1069501632),t,f,r[h+11],14,643717713),a,t,r[h+0],20,-373897302),i=u(i,a=u(a,t=u(t,f,i,a,r[h+5],5,-701558691),f,i,r[h+10],9,38016083),t,f,r[h+15],14,-660478335),a,t,r[h+4],20,-405537848),i=u(i,a=u(a,t=u(t,f,i,a,r[h+9],5,568446438),f,i,r[h+14],9,-1019803690),t,f,r[h+3],14,-187363961),a,t,r[h+8],20,1163531501),i=u(i,a=u(a,t=u(t,f,i,a,r[h+13],5,-1444681467),f,i,r[h+2],9,-51403784),t,f,r[h+7],14,1735328473),a,t,r[h+12],20,-1926607734),i=o(i,a=o(a,t=o(t,f,i,a,r[h+5],4,-378558),f,i,r[h+8],11,-2022574463),t,f,r[h+11],16,1839030562),a,t,r[h+14],23,-35309556),i=o(i,a=o(a,t=o(t,f,i,a,r[h+1],4,-1530992060),f,i,r[h+4],11,1272893353),t,f,r[h+7],16,-155497632),a,t,r[h+10],23,-1094730640),i=o(i,a=o(a,t=o(t,f,i,a,r[h+13],4,681279174),f,i,r[h+0],11,-358537222),t,f,r[h+3],16,-722521979),a,t,r[h+6],23,76029189),i=o(i,a=o(a,t=o(t,f,i,a,r[h+9],4,-640364487),f,i,r[h+12],11,-421815835),t,f,r[h+15],16,530742520),a,t,r[h+2],23,-995338651),i=c(i,a=c(a,t=c(t,f,i,a,r[h+0],6,-198630844),f,i,r[h+7],10,1126891415),t,f,r[h+14],15,-1416354905),a,t,r[h+5],21,-57434055),i=c(i,a=c(a,t=c(t,f,i,a,r[h+12],6,1700485571),f,i,r[h+3],10,-1894986606),t,f,r[h+10],15,-1051523),a,t,r[h+1],21,-2054922799),i=c(i,a=c(a,t=c(t,f,i,a,r[h+8],6,1873313359),f,i,r[h+15],10,-30611744),t,f,r[h+6],15,-1560198380),a,t,r[h+13],21,1309151649),i=c(i,a=c(a,t=c(t,f,i,a,r[h+4],6,-145523070),f,i,r[h+11],10,-1120210379),t,f,r[h+2],15,718787259),a,t,r[h+9],21,-343485551),t=n(t,l),f=n(f,g),i=n(i,v),a=n(a,d)}return[t,f,i,a]}function i(n){for(var r="",t=0;t<4*n.length;t++)r+="0123456789abcdef".charAt(n[t>>2]>>t%4*8+4&15)+"0123456789abcdef".charAt(n[t>>2]>>t%4*8&15);return r}function a(n){for(var r=1+(n.length+8>>6),t=new Array(16*r),e=0;e<16*r;e++)t[e]=0;for(e=0;e<n.length;e++)t[e>>2]|=(255&n.charCodeAt(e))<<e%4*8;return t[e>>2]|=128<<e%4*8,t[16*r-2]=8*n.length,t}module.exports={hexMD5:function(n){return i(f(a(n)))}}; 
 			}); 
		define("lib/qqmap-wx-jssdk.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var e=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),o={KEY_ERR:311,KEY_ERR_MSG:"key格式错误",PARAM_ERR:310,PARAM_ERR_MSG:"请求参数信息有误",SYSTEM_ERR:600,SYSTEM_ERR_MSG:"系统错误",WX_ERR_CODE:1e3,WX_OK_CODE:200},i={location2query:function(t){if("string"==typeof t)return t;for(var e="",o=0;o<t.length;o++){var i=t[o];e&&(e+=";"),i.location&&(e=e+i.location.lat+","+i.location.lng),i.latitude&&i.longitude&&(e=e+i.latitude+","+i.longitude)}return e},getWXLocation:function(t,e,o){wx.getLocation({type:"gcj02",success:t,fail:e,complete:o})},getLocationParam:function(t){return"string"==typeof t&&(t=2===t.split(",").length?{latitude:t.split(",")[0],longitude:t.split(",")[1]}:{}),t},polyfillParam:function(t){t.success=t.success||function(){},t.fail=t.fail||function(){},t.complete=t.complete||function(){}},checkParamKeyEmpty:function(t,e){if(!t[e]){var i=this.buildErrorConfig(o.PARAM_ERR,o.PARAM_ERR_MSG+e+"参数格式有误");return t.fail(i),t.complete(i),!0}return!1},checkKeyword:function(t){return!this.checkParamKeyEmpty(t,"keyword")},checkLocation:function(t){var e=this.getLocationParam(t.location);if(!e||!e.latitude||!e.longitude){var i=this.buildErrorConfig(o.PARAM_ERR,o.PARAM_ERR_MSG+" location参数格式有误");return t.fail(i),t.complete(i),!1}return!0},buildErrorConfig:function(t,e){return{status:t,message:e}},buildWxRequestConfig:function(t,e){var i=this;return e.header={"content-type":"application/json"},e.method="GET",e.success=function(e){var o=e.data;0===o.status?t.success(o):t.fail(o)},e.fail=function(e){e.statusCode=o.WX_ERR_CODE,t.fail(i.buildErrorConfig(o.WX_ERR_CODE,result.errMsg))},e.complete=function(e){switch(+e.statusCode){case o.WX_ERR_CODE:t.complete(i.buildErrorConfig(o.WX_ERR_CODE,e.errMsg));break;case o.WX_OK_CODE:var r=e.data;0===r.status?t.complete(r):t.complete(i.buildErrorConfig(r.status,r.message));break;default:t.complete(i.buildErrorConfig(o.SYSTEM_ERR,o.SYSTEM_ERR_MSG))}},e},locationProcess:function(t,e,r,a){var n=this;r=r||function(e){e.statusCode=o.WX_ERR_CODE,t.fail(n.buildErrorConfig(o.WX_ERR_CODE,e.errMsg))},a=a||function(e){e.statusCode==o.WX_ERR_CODE&&t.complete(n.buildErrorConfig(o.WX_ERR_CODE,e.errMsg))},t.location?n.checkLocation(t)&&e(i.getLocationParam(t.location)):n.getWXLocation(e,r,a)}},r=function(){function o(e){if(t(this,o),!e.key)throw Error("key值不能为空");this.key=e.key}return e(o,[{key:"search",value:function(t){var e=this;if(t=t||{},i.polyfillParam(t),i.checkKeyword(t)){var o={keyword:t.keyword,orderby:t.orderby||"_distance",page_size:t.page_size||10,page_index:t.page_index||1,output:"json",key:e.key};t.address_format&&(o.address_format=t.address_format),t.filter&&(o.filter=t.filter);var r=t.distance||"1000",a=t.auto_extend||1;i.locationProcess(t,function(e){o.boundary="nearby("+e.latitude+","+e.longitude+","+r+","+a+")",wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/place/v1/search",data:o}))})}}},{key:"getSuggestion",value:function(t){var e=this;if(t=t||{},i.polyfillParam(t),i.checkKeyword(t)){var o={keyword:t.keyword,region:t.region||"全国",region_fix:t.region_fix||0,policy:t.policy||0,output:"json",key:e.key};wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/place/v1/suggestion",data:o}))}}},{key:"reverseGeocoder",value:function(t){var e=this;t=t||{},i.polyfillParam(t);var o={coord_type:t.coord_type||5,get_poi:t.get_poi||0,output:"json",key:e.key};t.poi_options&&(o.poi_options=t.poi_options);i.locationProcess(t,function(e){o.location=e.latitude+","+e.longitude,wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/geocoder/v1/",data:o}))})}},{key:"geocoder",value:function(t){var e=this;if(t=t||{},i.polyfillParam(t),!i.checkParamKeyEmpty(t,"address")){var o={address:t.address,output:"json",key:e.key};wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/geocoder/v1/",data:o}))}}},{key:"getCityList",value:function(t){var e=this;t=t||{},i.polyfillParam(t);var o={output:"json",key:e.key};wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/district/v1/list",data:o}))}},{key:"getDistrictByCityId",value:function(t){var e=this;if(t=t||{},i.polyfillParam(t),!i.checkParamKeyEmpty(t,"id")){var o={id:t.id||"",output:"json",key:e.key};wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/district/v1/getchildren",data:o}))}}},{key:"calculateDistance",value:function(t){var e=this;if(t=t||{},i.polyfillParam(t),!i.checkParamKeyEmpty(t,"to")){var o={mode:t.mode||"walking",to:i.location2query(t.to),output:"json",key:e.key};t.from&&(t.location=t.from),i.locationProcess(t,function(e){o.from=e.latitude+","+e.longitude,wx.request(i.buildWxRequestConfig(t,{url:"https://apis.map.qq.com/ws/distance/v1/",data:o}))})}}}]),o}();module.exports=r; 
 			}); 
		define("utils/tools.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../lib/base64.min.js").Base64,n=function(e){return""+"https://webapi2.qingbh.com/manman/index.php/api/"+e+"?platform=h5&ver=4.0.0.0002&deviceid=xiaochengxu&channel=30006&product=1"},r=require("../lib/md5.js"),o=function(e,o){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"-",i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return new Promise(function(c,u){i&&wx.showLoading({title:"加载中..."}),e=n(e);var s=function(e){var n="",r=function(e){var n=new Array,r=0;for(var o in e)void 0!==e[o]&&(n[r]=o,r++);var t=n.sort(),i={};for(var a in t)i[t[a]]=e[t[a]];return i}(e);for(var o in r)n+=o+r[o];return n+"#^%$&^@&)_+&%<<>?<,.asdaaaAAbefwfnnkpp{poQBEaNw>,LIipo"}(o);s=r.hexMD5(function(e){for(var n="",r=0;r<e.length;r++){var o=e.charCodeAt(r);o<128?n+=String.fromCharCode(o):o<2048?(n+=String.fromCharCode(o>>6|192),n+=String.fromCharCode(63&o|128)):o<65536?(n+=String.fromCharCode(o>>12|224),n+=String.fromCharCode(o>>6&63|128),n+=String.fromCharCode(63&o|128)):(n+=String.fromCharCode(o>>18|240),n+=String.fromCharCode(o>>12&63|128),n+=String.fromCharCode(o>>6&63|128),n+=String.fromCharCode(63&o|128))}return n}(s)),o.sign=s,console.log("请求地址: "+e+", 传递参数: ",o," :信息: "+t),wx.request({method:"POST",url:e,data:o,success:function(e){i&&wx.hideLoading(),console.log("信息: "+t+", 返回数据: ",e.data),c(e.data)},fail:function(n){console.log("请求出现错误, 请求地址: "+e," --错误信息--",n),a?u(n):wx.showModal({title:"加载超时",content:n.errMsg,showCancel:!1,confirmText:"知道了"})}})})};exports._post=o,exports.formatTime=function(e){var n=function(e){return(e=e.toString())[1]?e:"0"+e},r=e.getFullYear(),o=e.getMonth()+1,t=e.getDate(),i=e.getHours(),a=e.getMinutes();e.getSeconds();return[r,o,t].map(n).join("-")+" "+[i,a].map(n).join(":")},exports.cleantime=function(e){var n=Math.floor(e/3600/24),r=n.toString();1==r.length&&(r="0"+r);var o=Math.floor((e-3600*n*24)/3600),t=o.toString();1==t.length&&(t="0"+t);var i=Math.floor((e-3600*n*24-3600*o)/60),a=i.toString();1==a.length&&(a="0"+a);var c=(e-3600*n*24-3600*o-60*i).toString();return 1==c.length&&(c="0"+c),r+"天"+t+":"+a+":"+c},exports.loginFn=function(n,r){return new Promise(function(t,i){var a=wx.getStorageSync("tempuid");new Promise(function(t,i){if("wechat"==n){var c=r.userinfo,u=r.wxlogin;o("v1/user/wx_user_allow",{appid:"wx6d524f663016a604",encryptedData:c.encryptedData,iv:c.iv,code:u.code},"发送后台解密").then(function(n){var r=n.unionId,c=n.openId,u={uid:a,nickname:e.encode(n.nickName),sex:n.sex?n.sex:"",city:n.city,province:n.province,country:n.country,headimgurl:n.avatarUrl,unionid:r,wopenid:c};o("v1/user/user_tempweixin_login",u,"微信登录").then(function(e){0!=e.error?i("01 "+e.errorMsg):t(e)})})}else o("v1/user/user_login_sms_verify",{phone:r.phone,uid:a,code:r.code},"手机号登陆").then(function(e){0!=e.error?i("02 "+e.errorMsg):t(e)})}).then(function(e){var o=e.usermessage,i=""==o.headurl?""==e.headimgurl?"/images/"+r.iconsrc+"/logo.png":e.headimgurl:o.headurl,a=""==o.nickname?"wechat"==n?e.nickname:e.phone:o.nickname,c={login_type:n,uid:e.uid,headurl:i,nickname:a};wx.setStorageSync("3rd_session",c),t()}).catch(function(e){wx.showModal({title:"登录失败",content:"错误信息: "+e+" \r\n 微信登录暂时出现问题，可选择手机登录",cancelText:"取消",confirmText:"手机登录",success:function(e){console.log(e),e.confirm&&wx.redirectTo({url:"/pages/phoneLogin/phoneLogin"})}})})})}; 
 			}); 
		define("utils/wxCharts.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),n=1;n<arguments.length;n++){var a=arguments[n];if(null!=a)for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(i[o]=a[o])}return i}function e(t,e,i){if(isNaN(t))throw new Error("[wxCharts] unvalid series data!");i=i||10,e=e||"upper";for(var n=1;i<1;)i*=10,n*=10;for(t="upper"===e?Math.ceil(t*n):Math.floor(t*n);t%i!=0;)"upper"===e?t++:t--;return t/n}function i(t,e,i,n){var a=n.width-i.padding-e.xAxisPoints[0],o=e.eachSpacing*n.categories.length,r=t;return t>=0?r=0:Math.abs(t)>=o-a&&(r=a-o),r}function n(t,e,i){function n(t){for(;t<0;)t+=2*Math.PI;for(;t>2*Math.PI;)t-=2*Math.PI;return t}return t=n(t),e=n(e),i=n(i),e>i&&(i+=2*Math.PI,t<e&&(t+=2*Math.PI)),t>=e&&t<=i}function a(t,e,i){var n=t,a=i-e,o=n+(i-a-n)/Math.sqrt(2);return{transX:o*=-1,transY:(i-a)*(Math.sqrt(2)-1)-(i-a-n)/Math.sqrt(2)}}function o(t,e){function i(t,e){return!(!t[e-1]||!t[e+1])&&(t[e].y>=Math.max(t[e-1].y,t[e+1].y)||t[e].y<=Math.min(t[e-1].y,t[e+1].y))}var n=null,a=null,o=null,r=null;if(e<1?(n=t[0].x+.2*(t[1].x-t[0].x),a=t[0].y+.2*(t[1].y-t[0].y)):(n=t[e].x+.2*(t[e+1].x-t[e-1].x),a=t[e].y+.2*(t[e+1].y-t[e-1].y)),e>t.length-3){var s=t.length-1;o=t[s].x-.2*(t[s].x-t[s-1].x),r=t[s].y-.2*(t[s].y-t[s-1].y)}else o=t[e+1].x-.2*(t[e+2].x-t[e].x),r=t[e+1].y-.2*(t[e+2].y-t[e].y);return i(t,e+1)&&(r=t[e+1].y),i(t,e)&&(a=t[e].y),{ctrA:{x:n,y:a},ctrB:{x:o,y:r}}}function r(t,e,i){return{x:i.x+t,y:i.y-e}}function s(t,e){if(e)for(;it.isCollision(t,e);)t.start.x>0?t.start.y--:t.start.x<0?t.start.y++:t.start.y>0?t.start.y++:t.start.y--;return t}function l(t,e){var i=0;return t.map(function(t){return t.color||(t.color=e.colors[i],i=(i+1)%e.colors.length),t})}function h(t,i){var n=0,a=i-t;return n=a>=1e4?1e3:a>=1e3?100:a>=100?10:a>=10?5:a>=1?1:a>=.1?.1:.01,{minRange:e(t,"lower",n),maxRange:e(i,"upper",n)}}function c(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,i=0;return(t=(t=String(t)).split("")).forEach(function(t){/[a-zA-Z]/.test(t)?i+=7:/[0-9]/.test(t)?i+=5.5:/\./.test(t)?i+=2.7:/-/.test(t)?i+=3.25:/[\u4e00-\u9fa5]/.test(t)?i+=10:/\(|\)/.test(t)?i+=3.73:/\s/.test(t)?i+=2.5:/%/.test(t)?i+=8:i+=10}),i*e/10}function f(t){return t.reduce(function(t,e){return(t.data?t.data:t).concat(e.data)},[])}function d(t,e){var i=[];return t.forEach(function(t){if(null!==t.data[e]&&void 0!==t.data[e]){var n={};n.color=t.color,n.name=t.name,n.data=t.format?t.format(t.data[e]):t.data[e],i.push(n)}}),i}function u(t){var e=t.map(function(t){return c(t)});return Math.max.apply(null,e)}function x(t){for(var e=2*Math.PI/t,i=[],n=0;n<t;n++)i.push(e*n);return i.map(function(t){return-1*t+Math.PI/2})}function g(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=t.map(function(t){return{text:a.format?a.format(t,n[i]):t.name+": "+t.data,color:t.color}}),r=[],s={x:0,y:0};return e.forEach(function(t){void 0!==t[i]&&null!==t[i]&&r.push(t[i])}),r.forEach(function(t){s.x=Math.round(t.x),s.y+=t.y}),s.y/=r.length,{textList:o,offset:s}}function p(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=-1;return y(t,i,n)&&e.forEach(function(e,i){t.x+a>e&&(o=i)}),o}function y(t,e,i){return t.x<e.width-i.padding&&t.x>i.padding+i.yAxisWidth+i.yAxisTitleWidth&&t.y>i.padding&&t.y<e.height-i.legendHeight-i.xAxisHeight-i.padding}function v(t,e,i){var n=2*Math.PI/i,a=-1;if(m(t,e.center,e.radius)){var o=function(t){return t<0&&(t+=2*Math.PI),t>2*Math.PI&&(t-=2*Math.PI),t},r=Math.atan2(e.center.y-t.y,t.x-e.center.x);(r*=-1)<0&&(r+=2*Math.PI),e.angleList.map(function(t){return t=o(-1*t)}).forEach(function(t,e){var i=o(t-n/2),s=o(t+n/2);s<i&&(s+=2*Math.PI),(r>=i&&r<=s||r+2*Math.PI>=i&&r+2*Math.PI<=s)&&(a=e)})}return a}function P(t,e){var i=-1;if(m(t,e.center,e.radius)){var a=Math.atan2(e.center.y-t.y,t.x-e.center.x);a=-a;for(var o=0,r=e.series.length;o<r;o++){var s=e.series[o];if(n(a,s._start_,s._start_+2*s._proportion_*Math.PI)){i=o;break}}}return i}function m(t,e,i){return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<=Math.pow(i,2)}function S(t){var e=[],i=[];return t.forEach(function(t,n){null!==t?i.push(t):(i.length&&e.push(i),i=[])}),i.length&&e.push(i),e}function T(t,e,i){if(!1===e.legend)return{legendList:[],legendHeight:0};var n=[],a=0,o=[];return t.forEach(function(t){var i=30+c(t.name||"undefined");a+i>e.width?(n.push(o),a=i,o=[t]):(a+=i,o.push(t))}),o.length&&n.push(o),{legendList:n,legendHeight:n.length*(i.fontSize+8)+5}}function A(t,e,i){var n={angle:0,xAxisHeight:i.xAxisHeight},a=F(t,e,i).eachSpacing,o=t.map(function(t){return c(t)}),r=Math.max.apply(this,o);return r+2*i.xAxisTextPadding>a&&(n.angle=45*Math.PI/180,n.xAxisHeight=2*i.xAxisTextPadding+r*Math.sin(n.angle)),n}function b(t,e,i,n,a){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,s=a.extra.radar||{};s.max=s.max||0;var l=Math.max(s.max,Math.max.apply(null,f(n))),h=[];return n.forEach(function(n){var a={};a.color=n.color,a.data=[],n.data.forEach(function(n,s){var h={};h.angle=t[s],h.proportion=n/l,h.position=r(i*h.proportion*o*Math.cos(h.angle),i*h.proportion*o*Math.sin(h.angle),e),a.data.push(h)}),h.push(a)}),h}function M(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=0,n=0;return t.forEach(function(t){t.data=null===t.data?0:t.data,i+=t.data}),t.forEach(function(t){t.data=null===t.data?0:t.data,t._proportion_=t.data/i*e}),t.forEach(function(t){t._start_=n,n+=2*t._proportion_*Math.PI}),t}function _(t){var e=0;return(t=M(t)).forEach(function(t){var i=t.format?t.format(+t._proportion_.toFixed(2)):it.toFixed(100*t._proportion_)+"%";e=Math.max(e,c(i))}),e}function E(t,e,i,n,a,o){return t.map(function(t){return null===t?null:(t.width=(e-2*a.columePadding)/i,o.extra.column&&o.extra.column.width&&+o.extra.column.width>0?t.width=Math.min(t.width,+o.extra.column.width):t.width=Math.min(t.width,25),t.x+=(n+.5-i/2)*t.width,t)})}function F(t,e,i){var n=i.yAxisWidth+i.yAxisTitleWidth,a=(e.width-2*i.padding-n)/(e.enableScroll?Math.min(5,t.length):t.length),o=[],r=i.padding+n,s=e.width-i.padding;return t.forEach(function(t,e){o.push(r+e*a)}),!0===e.enableScroll?o.push(r+t.length*a):o.push(s),{xAxisPoints:o,startX:r,endX:s,eachSpacing:a}}function w(t,e,i,n,a,o,r){var s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,l=[],h=o.height-2*r.padding-r.xAxisHeight-r.legendHeight;return t.forEach(function(t,c){if(null===t)l.push(null);else{var f={};f.x=n[c]+Math.round(a/2);var d=h*(t-e)/(i-e);d*=s,f.y=o.height-r.xAxisHeight-r.legendHeight-Math.round(d)-r.padding,l.push(f)}}),l}function L(t,e,i){var n=f(t);n=n.filter(function(t){return null!==t});var a=Math.min.apply(this,n),o=Math.max.apply(this,n);if("number"==typeof e.yAxis.min&&(a=Math.min(e.yAxis.min,a)),"number"==typeof e.yAxis.max&&(o=Math.max(e.yAxis.max,o)),a===o){var r=o||1;a-=r,o+=r}for(var s=h(a,o),l=s.minRange,c=[],d=(s.maxRange-l)/i.yAxisSplit,u=0;u<=i.yAxisSplit;u++)c.push(l+d*u);return c.reverse()}function k(t,e,i){var n=L(t,e,i),a=i.yAxisWidth,o=n.map(function(t){return t=it.toFixed(t,2),t=e.yAxis.format?e.yAxis.format(Number(t)):t,a=Math.max(a,c(t)+5),t});return!0===e.yAxis.disabled&&(a=0),{rangesFormat:o,ranges:n,yAxisWidth:a}}function C(t,e,i,n,a,o){var r=null;i[0].data.forEach(function(t,e){t==a&&(r=e)}),n.beginPath(),n.setStrokeStyle("#ffffff"),n.setLineWidth(0),n.setFillStyle(o);var s=t[r];n.moveTo(s.x+3.5,s.y),n.arc(s.x,s.y,3,0,2*Math.PI,!1),n.closePath(),n.fill()}function I(t,e,i,n){n.beginPath(),n.setStrokeStyle("#ffffff"),n.setLineWidth(0),n.setFillStyle(e),"diamond"===i?t.forEach(function(t,e){null!==t&&(n.moveTo(t.x,t.y-4.5),n.lineTo(t.x-4.5,t.y),n.lineTo(t.x,t.y+4.5),n.lineTo(t.x+4.5,t.y),n.lineTo(t.x,t.y-4.5))}):"circle"===i?t.forEach(function(t,e){null!==t&&(n.moveTo(t.x+3.5,t.y),n.arc(t.x,t.y,3,0,2*Math.PI,!1))}):"rect"===i?t.forEach(function(t,e){null!==t&&(n.moveTo(t.x-3.5,t.y-3.5),n.rect(t.x-3.5,t.y-3.5,7,7))}):"triangle"===i&&t.forEach(function(t,e){null!==t&&(n.moveTo(t.x,t.y-4.5),n.lineTo(t.x-4.5,t.y+4.5),n.lineTo(t.x+4.5,t.y+4.5),n.lineTo(t.x,t.y-4.5))}),n.closePath(),n.fill()}function H(t,e,i){var n=t.title.fontSize||e.titleFontSize,a=t.subtitle.fontSize||e.subtitleFontSize,o=t.title.name||"",r=t.subtitle.name||"",s=t.title.color||e.titleColor,l=t.subtitle.color||e.subtitleColor,h=o?n:0,f=r?a:0;if(r){var d=c(r,a),u=(t.width-d)/2+(t.subtitle.offsetX||0),x=(t.height-e.legendHeight+a)/2;o&&(x-=(h+5)/2),i.beginPath(),i.setFontSize(a),i.setFillStyle(l),i.fillText(r,u,x),i.stroke(),i.closePath()}if(o){var g=c(o,n),p=(t.width-g)/2+(t.title.offsetX||0),y=(t.height-e.legendHeight+n)/2;r&&(y+=(f+5)/2),i.beginPath(),i.setFontSize(n),i.setFillStyle(s),i.fillText(o,p,y),i.stroke(),i.closePath()}}function z(t,e,i,n){var a=e.data;n.beginPath(),n.setFontSize(i.fontSize),n.setFillStyle("#666666"),t.forEach(function(t,i){if(null!==t){var o=e.format?e.format(a[i]):a[i];n.fillText(o,t.x-c(o)/2,t.y-2)}}),n.closePath(),n.stroke()}function D(t,e,i,n,a,o){var s=n.extra.radar||{};e+=a.radarLabelTextMargin,o.beginPath(),o.setFontSize(a.fontSize),o.setFillStyle(s.labelColor||"#666666"),t.forEach(function(t,s){var l={x:e*Math.cos(t),y:e*Math.sin(t)},h=r(l.x,l.y,i),f=h.x,d=h.y;it.approximatelyEqual(l.x,0)?f-=c(n.categories[s]||"")/2:l.x<0&&(f-=c(n.categories[s]||"")),o.fillText(n.categories[s]||"",f,d+a.fontSize/2)}),o.stroke(),o.closePath()}function W(t,e,i,n,a,o){var l=a+i.pieChartLinePadding,h=[],f=null;t.map(function(t){return{arc:2*Math.PI-(t._start_+2*Math.PI*t._proportion_/2),text:t.format?t.format(+t._proportion_.toFixed(2)):it.toFixed(100*t._proportion_)+"%",color:t.color}}).forEach(function(t){var e=Math.cos(t.arc)*l,n=Math.sin(t.arc)*l,o=Math.cos(t.arc)*a,r=Math.sin(t.arc)*a,d=e>=0?e+i.pieChartTextPadding:e-i.pieChartTextPadding,u=n,x=c(t.text),g=u;f&&it.isSameXCoordinateArea(f.start,{x:d})&&(g=d>0?Math.min(u,f.start.y):e<0?Math.max(u,f.start.y):u>0?Math.max(u,f.start.y):Math.min(u,f.start.y)),d<0&&(d-=x);var p={lineStart:{x:o,y:r},lineEnd:{x:e,y:n},start:{x:d,y:g},width:x,height:i.fontSize,text:t.text,color:t.color};f=s(p,f),h.push(f)}),h.forEach(function(t){var e=r(t.lineStart.x,t.lineStart.y,o),a=r(t.lineEnd.x,t.lineEnd.y,o),s=r(t.start.x,t.start.y,o);n.setLineWidth(1),n.setFontSize(i.fontSize),n.beginPath(),n.setStrokeStyle(t.color),n.setFillStyle(t.color),n.moveTo(e.x,e.y);var l=t.start.x<0?s.x+t.width:s.x,h=t.start.x<0?s.x-5:s.x+5;n.quadraticCurveTo(a.x,a.y,l,s.y),n.moveTo(e.x,e.y),n.stroke(),n.closePath(),n.beginPath(),n.moveTo(s.x+t.width,s.y),n.arc(l,s.y,2,0,2*Math.PI),n.closePath(),n.fill(),n.beginPath(),n.setFillStyle("#666666"),n.fillText(t.text,h,s.y+3),n.closePath(),n.stroke(),n.closePath()})}function O(t,e,i,n){var a=i.padding,o=e.height-i.padding-i.xAxisHeight-i.legendHeight;n.beginPath(),n.setStrokeStyle("#cccccc"),n.setLineWidth(1),n.moveTo(t,a),n.lineTo(t,o),n.stroke(),n.closePath()}function X(e,i,n,a,o){var r=!1;(i=t({x:0,y:0},i)).y-=8;var s=e.map(function(t){return c(t.text)}),l=9+4*a.toolTipPadding+Math.max.apply(null,s),h=2*a.toolTipPadding+e.length*a.toolTipLineHeight;i.x-Math.abs(n._scrollDistance_)+8+l>n.width&&(r=!0),o.beginPath(),o.setFillStyle(n.tooltip.option.background||a.toolTipBackground),o.setGlobalAlpha(a.toolTipOpacity),r?(o.moveTo(i.x,i.y+10),o.lineTo(i.x-8,i.y+10-5),o.lineTo(i.x-8,i.y+10+5),o.moveTo(i.x,i.y+10),o.fillRect(i.x-l-8,i.y,l,h)):(o.moveTo(i.x,i.y+10),o.lineTo(i.x+8,i.y+10-5),o.lineTo(i.x+8,i.y+10+5),o.moveTo(i.x,i.y+10),o.fillRect(i.x+8,i.y,l,h)),o.closePath(),o.fill(),o.setGlobalAlpha(1),e.forEach(function(t,e){o.beginPath(),o.setFillStyle(t.color);var n=i.x+8+2*a.toolTipPadding,s=i.y+(a.toolTipLineHeight-a.fontSize)/2+a.toolTipLineHeight*e+a.toolTipPadding;r&&(n=i.x-l-8+2*a.toolTipPadding),o.fillRect(n,s,4,a.fontSize),o.closePath()}),o.beginPath(),o.setFontSize(a.fontSize),o.setFillStyle("#ffffff"),e.forEach(function(t,e){var n=i.x+8+2*a.toolTipPadding+4+5;r&&(n=i.x-l-8+2*a.toolTipPadding+4+5);var s=i.y+(a.toolTipLineHeight-a.fontSize)/2+a.toolTipLineHeight*e+a.toolTipPadding;o.fillText(t.text,n,s+a.fontSize)}),o.stroke(),o.closePath()}function G(t,e,i,n){var a=i.xAxisHeight+(e.height-i.xAxisHeight-c(t))/2;n.save(),n.beginPath(),n.setFontSize(i.fontSize),n.setFillStyle(e.yAxis.titleFontColor||"#333333"),n.translate(0,e.height),n.rotate(-90*Math.PI/180),n.fillText(t,a,i.padding+.5*i.fontSize),n.stroke(),n.closePath(),n.restore()}function R(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=k(t,e,i).ranges,r=F(e.categories,e,i),s=r.xAxisPoints,l=r.eachSpacing,h=o.pop(),c=o.shift();return n.save(),e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&n.translate(e._scrollDistance_,0),t.forEach(function(o,r){var f=w(o.data,h,c,s,l,e,i,a);f=E(f,l,t.length,r,i,e),n.beginPath(),n.setFillStyle(o.color),f.forEach(function(t,a){if(null!==t){var o=t.x-t.width/2+1,r=e.height-t.y-i.padding-i.xAxisHeight-i.legendHeight;n.moveTo(o,t.y),n.rect(o,t.y,t.width-2,r)}}),n.closePath(),n.fill()}),t.forEach(function(o,r){var f=w(o.data,h,c,s,l,e,i,a);f=E(f,l,t.length,r,i,e),!1!==e.dataLabel&&1===a&&z(f,o,i,n)}),n.restore(),{xAxisPoints:s,eachSpacing:l}}function q(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=k(t,e,i).ranges,s=F(e.categories,e,i),l=s.xAxisPoints,h=s.eachSpacing,c=r.pop(),f=r.shift(),d=e.height-i.padding-i.xAxisHeight-i.legendHeight,u=[];return n.save(),e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&n.translate(e._scrollDistance_,0),e.tooltip&&e.tooltip.textList&&e.tooltip.textList.length&&1===a&&O(e.tooltip.offset.x,e,i,n),t.forEach(function(t,r){var s=w(t.data,c,f,l,h,e,i,a);if(u.push(s),S(s).forEach(function(i){if(n.beginPath(),n.setStrokeStyle(t.color),n.setFillStyle(t.color),n.setGlobalAlpha(.6),n.setLineWidth(2),i.length>1){var a=i[0],r=i[i.length-1];n.moveTo(a.x,a.y),"curve"===e.extra.lineStyle?i.forEach(function(t,e){if(e>0){var a=o(i,e-1);n.bezierCurveTo(a.ctrA.x,a.ctrA.y,a.ctrB.x,a.ctrB.y,t.x,t.y)}}):i.forEach(function(t,e){e>0&&n.lineTo(t.x,t.y)}),n.lineTo(r.x,d),n.lineTo(a.x,d),n.lineTo(a.x,a.y)}else{var s=i[0];n.moveTo(s.x-h/2,s.y),n.lineTo(s.x+h/2,s.y),n.lineTo(s.x+h/2,d),n.lineTo(s.x-h/2,d),n.moveTo(s.x-h/2,s.y)}n.closePath(),n.fill(),n.setGlobalAlpha(1)}),!1!==e.dataPointShape){var x=i.dataPointShape[r%i.dataPointShape.length];I(s,t.color,x,n)}}),!1!==e.dataLabel&&1===a&&t.forEach(function(t,o){z(w(t.data,c,f,l,h,e,i,a),t,i,n)}),n.restore(),{xAxisPoints:l,calPoints:u,eachSpacing:h}}function B(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=k(t,e,i).ranges,s=F(e.categories,e,i),l=s.xAxisPoints,h=s.eachSpacing,c=r.pop(),f=r.shift(),d=[];return n.save(),e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&n.translate(e._scrollDistance_,0),e.tooltip&&e.tooltip.textList&&e.tooltip.textList.length&&1===a&&O(e.tooltip.offset.x,e,i,n),t.forEach(function(r,s){var u=w(r.data,c,f,l,h,e,i,a);if(d.push(u),S(u).forEach(function(t,i){n.beginPath(),n.setStrokeStyle(r.color),n.setLineWidth(2),1===t.length?(n.moveTo(t[0].x,t[0].y),n.arc(t[0].x,t[0].y,1,0,2*Math.PI)):(n.moveTo(t[0].x,t[0].y),"curve"===e.extra.lineStyle?t.forEach(function(e,i){if(i>0){var a=o(t,i-1);n.bezierCurveTo(a.ctrA.x,a.ctrA.y,a.ctrB.x,a.ctrB.y,e.x,e.y)}}):t.forEach(function(t,e){e>0&&n.lineTo(t.x,t.y)}),n.moveTo(t[0].x,t[0].y)),n.closePath(),n.stroke()}),!1!==e.dataPointShape){var x=i.dataPointShape[s%i.dataPointShape.length];I(u,r.color,x,n),C(u,r.color,t,n,e.nowPrice,e.pricecolor)}}),!1!==e.dataLabel&&1===a&&t.forEach(function(t,o){z(w(t.data,c,f,l,h,e,i,a),t,i,n)}),n.restore(),{xAxisPoints:l,calPoints:d,eachSpacing:h}}function j(t,e,i,n){i.save(),t._scrollDistance_&&0!==t._scrollDistance_&&!0===t.enableScroll&&i.translate(t._scrollDistance_,0),t.tooltip&&t.tooltip.textList&&t.tooltip.textList.length&&1===n&&X(t.tooltip.textList,t.tooltip.offset,t,e,i),i.restore()}function N(t,e,i,n){var o=F(t,e,i),r=o.xAxisPoints,s=(o.startX,o.endX,o.eachSpacing),l=e.height-i.padding-i.xAxisHeight-i.legendHeight;i.xAxisLineHeight;n.save(),e._scrollDistance_&&0!==e._scrollDistance_&&n.translate(e._scrollDistance_,0),n.beginPath(),n.setStrokeStyle(e.xAxis.gridColor||"#cccccc"),n.closePath(),n.stroke();var h=e.width-2*i.padding-i.yAxisWidth-i.yAxisTitleWidth,f=Math.min(t.length,Math.ceil(h/i.fontSize/1.5)),d=Math.ceil(t.length/f);t=t.map(function(t,e){return e%d!=0?"":t}),0===i._xAxisTextAngle_?(n.beginPath(),n.setFontSize(i.fontSize),n.setFillStyle(e.xAxis.fontColor||"#666666"),t.forEach(function(t,e){var a=s/2-c(t)/2;n.fillText(t,r[e]+a,l+i.fontSize+5)}),n.closePath(),n.stroke()):t.forEach(function(t,o){n.save(),n.beginPath(),n.setFontSize(i.fontSize),n.setFillStyle(e.xAxis.fontColor||"#666666");var h=c(t),f=s/2-h,d=a(r[o]+s/2,l+i.fontSize/2+5,e.height),u=d.transX,x=d.transY;n.rotate(-1*i._xAxisTextAngle_),n.translate(u,x),n.fillText(t,r[o]+f,l+i.fontSize+5),n.closePath(),n.stroke(),n.restore()}),n.restore()}function Y(t,e,i){for(var n=t.height-2*e.padding-e.xAxisHeight-e.legendHeight,a=Math.floor(n/e.yAxisSplit),o=e.yAxisWidth+e.yAxisTitleWidth,r=e.padding+o,s=t.width-e.padding,l=[],h=0;h<e.yAxisSplit;h++)l.push(e.padding+a*h);l.push(e.padding+a*e.yAxisSplit+2),i.beginPath(),i.setStrokeStyle(t.yAxis.gridColor||"#cccccc"),i.setLineWidth(1),l.forEach(function(t,e){i.moveTo(r,t),i.lineTo(s,t)}),i.closePath(),i.stroke()}function Z(t,e,i,n){if(!0!==e.yAxis.disabled){var a=k(t,e,i).rangesFormat,o=i.yAxisWidth+i.yAxisTitleWidth,r=e.height-2*i.padding-i.xAxisHeight-i.legendHeight,s=Math.floor(r/i.yAxisSplit),l=i.padding+o,h=e.width-i.padding,c=e.height-i.padding-i.xAxisHeight-i.legendHeight;n.setFillStyle(e.background||"#ffffff"),e._scrollDistance_<0&&n.fillRect(0,0,l,c+i.xAxisHeight+5),n.fillRect(h,0,e.width,c+i.xAxisHeight+5);for(var f=[],d=0;d<=i.yAxisSplit;d++)f.push(i.padding+s*d);n.stroke(),n.beginPath(),n.setFontSize(i.fontSize),n.setFillStyle(e.yAxis.fontColor||"#666666"),a.forEach(function(t,e){var a=f[e]?f[e]:c;n.fillText(t,i.padding+i.yAxisTitleWidth,a+i.fontSize/2)}),n.closePath(),n.stroke(),e.yAxis.title&&G(e.yAxis.title,e,i,n)}}function J(t,e,i,n){if(e.legend){T(t,e,i).legendList.forEach(function(t,a){var o=0;t.forEach(function(t){t.name=t.name||"undefined",o+=15+c(t.name)+15});var r=(e.width-o)/2+5,s=e.height-i.padding-i.legendHeight+a*(i.fontSize+8)+5+8;n.setFontSize(i.fontSize),t.forEach(function(t){switch(e.type){case"line":n.beginPath(),n.setLineWidth(1),n.setStrokeStyle(t.color),n.moveTo(r-2,s+5),n.lineTo(r+17,s+5),n.stroke(),n.closePath(),n.beginPath(),n.setLineWidth(1),n.setStrokeStyle("#ffffff"),n.setFillStyle(t.color),n.moveTo(r+7.5,s+5),n.arc(r+7.5,s+5,4,0,2*Math.PI),n.fill(),n.stroke(),n.closePath();break;case"pie":case"ring":n.beginPath(),n.setFillStyle(t.color),n.moveTo(r+7.5,s+5),n.arc(r+7.5,s+5,7,0,2*Math.PI),n.closePath(),n.fill();break;default:n.beginPath(),n.setFillStyle(t.color),n.moveTo(r,s),n.rect(r,s,15,10),n.closePath(),n.fill()}r+=20,n.beginPath(),n.setFillStyle(e.extra.legendTextColor||"#333333"),n.fillText(t.name,r,s+9),n.closePath(),n.stroke(),r+=c(t.name)+10})})}}function K(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=e.extra.pie||{};t=M(t,a);var r={x:e.width/2,y:(e.height-i.legendHeight)/2},s=Math.min(r.x-i.pieChartLinePadding-i.pieChartTextPadding-i._pieTextMaxLength_,r.y-i.pieChartLinePadding-i.pieChartTextPadding);if(e.dataLabel?s-=10:s-=2*i.padding,(t=t.map(function(t){return t._start_+=(o.offsetAngle||0)*Math.PI/180,t})).forEach(function(t){n.beginPath(),n.setLineWidth(2),n.setStrokeStyle("#ffffff"),n.setFillStyle(t.color),n.moveTo(r.x,r.y),n.arc(r.x,r.y,s,t._start_,t._start_+2*t._proportion_*Math.PI),n.closePath(),n.fill(),!0!==e.disablePieStroke&&n.stroke()}),"ring"===e.type){var l=.6*s;"number"==typeof e.extra.ringWidth&&e.extra.ringWidth>0&&(l=Math.max(0,s-e.extra.ringWidth)),n.beginPath(),n.setFillStyle(e.background||"#ffffff"),n.moveTo(r.x,r.y),n.arc(r.x,r.y,l,0,2*Math.PI),n.closePath(),n.fill()}if(!1!==e.dataLabel&&1===a){for(var h=!1,c=0,f=t.length;c<f;c++)if(t[c].data>0){h=!0;break}h&&W(t,e,i,n,s,r)}return 1===a&&"ring"===e.type&&H(e,i,n),{center:r,radius:s,series:t}}function Q(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=e.extra.radar||{},s=x(e.categories.length),l={x:e.width/2,y:(e.height-i.legendHeight)/2},h=Math.min(l.x-(u(e.categories)+i.radarLabelTextMargin),l.y-i.radarLabelTextMargin);h-=i.padding,n.beginPath(),n.setLineWidth(1),n.setStrokeStyle(o.gridColor||"#cccccc"),s.forEach(function(t){var e=r(h*Math.cos(t),h*Math.sin(t),l);n.moveTo(l.x,l.y),n.lineTo(e.x,e.y)}),n.stroke(),n.closePath();for(var c=1;c<=i.radarGridCount;c++)!function(t){var e={};n.beginPath(),n.setLineWidth(1),n.setStrokeStyle(o.gridColor||"#cccccc"),s.forEach(function(a,o){var s=r(h/i.radarGridCount*t*Math.cos(a),h/i.radarGridCount*t*Math.sin(a),l);0===o?(e=s,n.moveTo(s.x,s.y)):n.lineTo(s.x,s.y)}),n.lineTo(e.x,e.y),n.stroke(),n.closePath()}(c);return b(s,l,h,t,e,a).forEach(function(t,a){if(n.beginPath(),n.setFillStyle(t.color),n.setGlobalAlpha(.6),t.data.forEach(function(t,e){0===e?n.moveTo(t.position.x,t.position.y):n.lineTo(t.position.x,t.position.y)}),n.closePath(),n.fill(),n.setGlobalAlpha(1),!1!==e.dataPointShape){var o=i.dataPointShape[a%i.dataPointShape.length];I(t.data.map(function(t){return t.position}),t.color,o,n)}}),D(s,h,l,e,i,n),{center:l,radius:h,angleList:s}}function U(t,e){e.draw()}function V(t){this.isStop=!1,t.duration=void 0===t.duration?1e3:t.duration,t.timing=t.timing||"linear";var e="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setTimeout?function(t,e){setTimeout(function(){var e=+new Date;t(e)},e)}:function(t){t(null)},i=null,n=function(a){if(null===a||!0===this.isStop)return t.onProcess&&t.onProcess(1),void(t.onAnimationFinish&&t.onAnimationFinish());if(null===i&&(i=a),a-i<t.duration){var o=(a-i)/t.duration;o=(0,nt[t.timing])(o),t.onProcess&&t.onProcess(o),e(n,17)}else t.onProcess&&t.onProcess(1),t.onAnimationFinish&&t.onAnimationFinish()};n=n.bind(this),e(n,17)}function $(t,e,i,n){var a=this,o=e.series,r=e.categories,s=T(o=l(o,i),e,i).legendHeight;i.legendHeight=s;var h=k(o,e,i).yAxisWidth;if(i.yAxisWidth=h,r&&r.length){var c=A(r,e,i),f=c.xAxisHeight,d=c.angle;i.xAxisHeight=f,i._xAxisTextAngle_=d}"pie"!==t&&"ring"!==t||(i._pieTextMaxLength_=!1===e.dataLabel?0:_(o));var u=e.animation?1e3:0;switch(this.animationInstance&&this.animationInstance.stop(),t){case"line":this.animationInstance=new V({timing:"easeIn",duration:u,onProcess:function(t){Y(e,i,n);var s=B(o,e,i,n,t),l=s.xAxisPoints,h=s.calPoints,c=s.eachSpacing;a.chartData.xAxisPoints=l,a.chartData.calPoints=h,a.chartData.eachSpacing=c,N(r,e,i,n),Z(o,e,i,n),U(e,n)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"column":this.animationInstance=new V({timing:"easeIn",duration:u,onProcess:function(t){Y(e,i,n);var s=R(o,e,i,n,t),l=s.xAxisPoints,h=s.eachSpacing;a.chartData.xAxisPoints=l,a.chartData.eachSpacing=h,N(r,e,i,n),J(e.series,e,i,n),Z(o,e,i,n),U(e,n)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"area":this.animationInstance=new V({timing:"easeIn",duration:u,onProcess:function(t){Y(e,i,n);var s=q(o,e,i,n,t),l=s.xAxisPoints,h=s.calPoints,c=s.eachSpacing;a.chartData.xAxisPoints=l,a.chartData.calPoints=h,a.chartData.eachSpacing=c,N(r,e,i,n),J(e.series,e,i,n),Z(o,e,i,n),j(e,i,n,t),U(e,n)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"ring":case"pie":this.animationInstance=new V({timing:"easeInOut",duration:u,onProcess:function(t){a.chartData.pieData=K(o,e,i,n,t),J(e.series,e,i,n),U(e,n)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"radar":this.animationInstance=new V({timing:"easeInOut",duration:u,onProcess:function(t){a.chartData.radarData=Q(o,e,i,n,t),J(e.series,e,i,n),U(e,n)},onAnimationFinish:function(){a.event.trigger("renderComplete")}})}}function tt(){this.events={}}var et={yAxisWidth:15,yAxisSplit:5,xAxisHeight:0,xAxisLineHeight:0,legendHeight:0,yAxisTitleWidth:15,padding:12,columePadding:3,fontSize:10,dataPointShape:["circle","diamond","triangle","rect"],colors:["#ccc","#f7a35c","#434348","#90ed7d","#f15c80","#8085e9"],pieChartLinePadding:25,pieChartTextPadding:15,xAxisTextPadding:3,titleColor:"#333333",titleFontSize:20,subtitleColor:"#999999",subtitleFontSize:15,toolTipPadding:3,toolTipBackground:"#000000",toolTipOpacity:.7,toolTipLineHeight:14,radarGridCount:3,radarLabelTextMargin:15},it={toFixed:function(t,e){return e=e||2,this.isFloat(t)&&(t=t.toFixed(e)),t},isFloat:function(t){return t%1!=0},approximatelyEqual:function(t,e){return Math.abs(t-e)<1e-10},isSameSign:function(t,e){return Math.abs(t)===t&&Math.abs(e)===e||Math.abs(t)!==t&&Math.abs(e)!==e},isSameXCoordinateArea:function(t,e){return this.isSameSign(t.x,e.x)},isCollision:function(t,e){return t.end={},t.end.x=t.start.x+t.width,t.end.y=t.start.y-t.height,e.end={},e.end.x=e.start.x+e.width,e.end.y=e.start.y-e.height,!(e.start.x>t.end.x||e.end.x<t.start.x||e.end.y>t.start.y||e.start.y<t.end.y)}},nt={easeIn:function(t){return Math.pow(t,3)},easeOut:function(t){return Math.pow(t-1,3)+1},easeInOut:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},linear:function(t){return t}};V.prototype.stop=function(){this.isStop=!0},tt.prototype.addEventListener=function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},tt.prototype.trigger=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=e[0],a=e.slice(1);this.events[n]&&this.events[n].forEach(function(t){try{t.apply(null,a)}catch(t){console.error(t)}})};var at=function(e){e.title=e.title||{},e.subtitle=e.subtitle||{},e.yAxis=e.yAxis||{},e.xAxis=e.xAxis||{},e.extra=e.extra||{},e.legend=!1!==e.legend,e.animation=!1!==e.animation;var i=t({},et);i.yAxisTitleWidth=!0!==e.yAxis.disabled&&e.yAxis.title?i.yAxisTitleWidth:0,i.pieChartLinePadding=!1===e.dataLabel?0:i.pieChartLinePadding,i.pieChartTextPadding=!1===e.dataLabel?0:i.pieChartTextPadding,this.opts=e,this.config=i,this.context=wx.createCanvasContext(e.canvasId),this.chartData={},this.event=new tt,this.scrollOption={currentOffset:0,startTouchX:0,distance:0},$.call(this,e.type,e,i,this.context)};at.prototype.updateData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.opts.series=e.series||this.opts.series,this.opts.categories=e.categories||this.opts.categories,this.opts.title=t({},this.opts.title,e.title||{}),this.opts.subtitle=t({},this.opts.subtitle,e.subtitle||{}),$.call(this,this.opts.type,this.opts,this.config,this.context)},at.prototype.stopAnimation=function(){this.animationInstance&&this.animationInstance.stop()},at.prototype.addEventListener=function(t,e){this.event.addEventListener(t,e)},at.prototype.getCurrentDataIndex=function(t){var e=t.touches&&t.touches.length?t.touches:t.changedTouches;if(e&&e.length){var i=e[0],n=i.x,a=i.y;return"pie"===this.opts.type||"ring"===this.opts.type?P({x:n,y:a},this.chartData.pieData):"radar"===this.opts.type?v({x:n,y:a},this.chartData.radarData,this.opts.categories.length):p({x:n,y:a},this.chartData.xAxisPoints,this.opts,this.config,Math.abs(this.scrollOption.currentOffset))}return-1},at.prototype.showToolTip=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("line"===this.opts.type||"area"===this.opts.type){var n=this.getCurrentDataIndex(e),a=this.scrollOption.currentOffset,o=t({},this.opts,{_scrollDistance_:a,animation:!1});if(n>-1){var r=d(this.opts.series,n);if(0!==r.length){var s=g(r,this.chartData.calPoints,n,this.opts.categories,i),l=s.textList,h=s.offset;o.tooltip={textList:l,offset:h,option:i}}}$.call(this,o.type,o,this.config,this.context)}},at.prototype.scrollStart=function(t){t.touches[0]&&!0===this.opts.enableScroll&&(this.scrollOption.startTouchX=t.touches[0].x)},at.prototype.scroll=function(e){if(e.touches[0]&&!0===this.opts.enableScroll){var n=e.touches[0].x-this.scrollOption.startTouchX,a=this.scrollOption.currentOffset,o=i(a+n,this.chartData,this.config,this.opts);this.scrollOption.distance=n=o-a;var r=t({},this.opts,{_scrollDistance_:a+n,animation:!1});$.call(this,r.type,r,this.config,this.context)}},at.prototype.scrollEnd=function(t){if(!0===this.opts.enableScroll){var e=this.scrollOption,i=e.currentOffset,n=e.distance;this.scrollOption.currentOffset=i+n,this.scrollOption.distance=0}},module.exports=at; 
 			}); 
		define("app.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("./utils/tools.js"),e=require("lib/qqmap-wx-jssdk.js"),o=null;App({onLaunch:function(){o=new e({key:"5TBBZ-ZI2WU-Q7CVG-4J4GO-Y2Z5H-TWBZY"})},globalData:{userInfo:null,hasUserInfo:!1,cityId:"",cityName:"",selectCityId:"",selectCityName:"",hasCityData:"",latitude:"",longitude:"",colors:{maincolor:"#ff5500",xkbtnbg:"#ff8400",ysbtnbg:"#4ca9ff",fontcolor:"#ff5500",labelbg:"#ff5500",iconsrc:"qmmicon",cinamerlabelcolor:"#78b1ff",ordernopay:"#ff0006",orderback:"#08a500",orderwait:"#ff5500",ordertickettotal:"#ff5500",minenavcolor:"#ff5500",codebg:"#fff4ef"}},getLocation:function(t){var e=this;return new Promise(function(t,n){wx.getLocation({type:"gcj02",success:function(n){console.log(n,"-------wx_location");var i=n.latitude,c=n.longitude,a=c+","+i;wx.setStorage({key:"location",data:a}),new Promise(function(t,e){console.log(11111111111),o.reverseGeocoder({location:{latitude:i,longitude:c},success:function(e){console.log(222222222222),console.log(e,"-=-=-=解析后的定位信息");var o=e.result.ad_info,n=o.city.slice(0,o.city.length-1);t(n)},fail:function(e){console.log(2222222222.111111),console.log("解析地址出错",e),t()},complete:function(e){console.log(2222222.22222),console.log("解析地址完成",e),t()}})}).then(function(o){console.log(333333333333),e.setLocation(o).then(function(e){t()})})},fail:function(o){console.log(o,"-=-=-=-=定位失败"),wx.setStorage({key:"location",data:"116.44355, 39.9219"}),e.setLocation().then(function(e){t()})}})})},setLocation:function(e){function o(t,e){for(var o=(e?JSON.parse(e):JSON.parse(wx.getStorageSync("citydata"))).letter,i=null,c=0;c<o.length;c++){var a=o[c];if(a.cityname==n||a.cityname+"市"==n){i=a.cityid;break}}return i}console.log(444444444444444),console.log(e,"-=-=定位的城市");var n=e||"北京";return new Promise(function(i,c){var a=null,l=null,r=wx.getStorageSync("locationStorage");""!=r?(r.local.cityname!=n&&(r.local={cityname:n,cityid:o()},wx.setStorage({key:"locationStorage",data:r})),i()):new Promise(function(e,o){a=n;var i=wx.getStorageSync("citydata");""==i?(0,t._post)("v2/city/citylist",{},"获取城市列表",!1).then(function(t){i=JSON.stringify({hot:t.hot,letter:t.letter,num:t.number}),wx.setStorage({key:"citydata",data:i}),e(i)}):e(i)}).then(function(t){l=o(0,t);var c={local:{cityid:e?l:0,cityname:e?n:"定位失败"},select:{cityid:l,cityname:n}};wx.setStorageSync("locationStorage",c),i()})})},setPageCityId:function(t){var e=wx.getStorageSync("locationStorage");t.setData({city:e.select?e.select.cityname:e.local.cityname,cityid:e.select?e.select.cityid:e.local.cityid})},requestUid:function(){return new Promise(function(e){(0,t._post)("v1/user/user_temp_login",{},"获取临时uid",!1).then(function(t){var o=t.uid;wx.setStorageSync("tempuid",o),e(o)})})},setPageUid:function(t){var e=this;return new Promise(function(o){var n=wx.getStorageSync("3rd_session");""==n?new Promise(function(t){var o=wx.getStorageSync("tempuid");""==o?e.requestUid().then(function(e){t(e)}):t(o)}).then(function(e){t.setData({uid:Number(e),uidType:"temp"}),o()}):(t.setData({uid:Number(n.uid),uidType:"work"}),o())})},setPageColor:function(t){var e=this.globalData.colors;t.setData({colors:e})}}); 
 			}); 	require("app.js");
 		__wxRoute = 'component/cinamerlist/cinamerlist';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/cinamerlist/cinamerlist.js';	define("component/cinamerlist/cinamerlist.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=getApp();Component({externalClasses:["iconfont","icon-tuijianjiaobiao","icon-shoucangjiaobiao"],properties:{cinamer:{type:Object,observer:function(e,a,i){null!=e&&(e.forEach(function(e){e.group_lable&&e.group_lable.length>0&&e.labels.push(e.group_lable),void 0==e.cinemaid&&(e.cinemaid=e.id)}),this.setData({cinamer:e}))}}},data:{},attached:function(){e.setPageColor(this)},methods:{}}); 
 			}); 	require("component/cinamerlist/cinamerlist.js");
 		__wxRoute = 'component/coupon/coupon';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/coupon/coupon.js';	define("component/coupon/coupon.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp();Component({externalClasses:["iconfont","icon-dianyingquan","icon-dizhixuanzhong"],properties:{data:{type:Object}},data:{},methods:{showdesc:function(){var t=this.data.data.desc.replace(/\\n/g,"\r\n");wx.showModal({title:"提示",content:t,showCancel:!1,confirmText:"知道了"})},check:function(t){var e=t.currentTarget.dataset;this.triggerEvent("radioChange",{id:e.id,channel:e.channel,type:e.type})}},attached:function(){t.setPageColor(this)}}); 
 			}); 	require("component/coupon/coupon.js");
 		__wxRoute = 'component/loginsheet/loginsheet';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/loginsheet/loginsheet.js';	define("component/loginsheet/loginsheet.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var n=require("../../utils/tools.js");Component({properties:{},data:{},methods:{handleHidden:function(){this.triggerEvent("hideSheet",{})},preventD:function(){},getUserInfoFun:function(){var e=this;wx.login({success:function(t){wx.getUserInfo({success:function(i){var o={userinfo:i,wxlogin:t};(0,n.loginFn)("wechat",o).then(function(){e.triggerEvent("loginend",{})})}})}})},setStorage:function(n,e){return new Promise(function(t,i){wx.setStorage({key:n,data:e,success:function(){t()}})})}}}); 
 			}); 	require("component/loginsheet/loginsheet.js");
 		__wxRoute = 'component/moviecard/moviecard';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/moviecard/moviecard.js';	define("component/moviecard/moviecard.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=getApp();Component({externalClasses:["iconfont","icon-dizhixuanzhong"],properties:{card:{type:Object}},data:{},attached:function(){e.setPageColor(this)},methods:{cardview:function(e){var t=e.currentTarget.dataset.index;this.triggerEvent("cardview",{index:t})},usecard:function(e){var t=e.currentTarget.dataset.index;this.triggerEvent("usecard",{index:t})}}}); 
 			}); 	require("component/moviecard/moviecard.js");
 		__wxRoute = 'component/movielist/movielist';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/movielist/movielist.js';	define("component/movielist/movielist.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),e=getApp();Component({properties:{movie:{type:Object},from:{type:String},noafter:{type:Boolean}},data:{},attached:function(){e.setPageColor(this)},methods:{likemovie:function(t){var i=this;console.log(this.data.movie),e.setPageUid(this).then(function(t){"temp"!=i.data.uidType?i.likemovieFn():i.setData({showLogin:!0})})},hideSheet:function(){this.setData({showLogin:!1})},loginend:function(){var t=this;e.setPageUid(this).then(function(e){t.hideSheet(),t.likemovieFn()})},likemovieFn:function(){var e=this,i=this.data.movie;(0,t._post)("v2/movies/like",{movieid:i.id,uid:this.data.uid},"想看").then(function(t){i.buystaus=1===t.type?3:4,wx.showToast({title:1===t.type?"已取消想看":"已想看"}),e.setData({movie:i})})},handleErrImg:function(t){console.log("moviedetail",t);var e=this.data.movie;e.pic="/images/zhanwei.png",this.setData({movie:e})}}}); 
 			}); 	require("component/movielist/movielist.js");
 		__wxRoute = 'component/sharecanvas/sharecanvas';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'component/sharecanvas/sharecanvas.js';	define("component/sharecanvas/sharecanvas.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js");Component({properties:{movie_name:String,movie_pic:String,group_price:String,price:String,font_color:String},data:{canvasWidth:360,canvasHeight:288},ready:function(){var t=this,e=this.data,i=e.canvasWidth,n=e.canvasHeight,a=e.movie_name,o=e.movie_pic;this.createImgResource(o).then(function(e){var o=wx.createCanvasContext("shareCard",t);o.drawImage("/images/sharebg.png",0,0,i,n),o.save(),o.drawImage(e,70,72,78,112),o.restore(),t.storkeText(a,o),o.draw(!0,setTimeout(function(){wx.canvasToTempFilePath({canvasId:"shareCard",quality:1,success:function(e){try{t.triggerEvent("draw",{path:e.tempFilePath})}catch(t){}},fail:function(t){try{this.triggerEvent("draw",{path:"error"})}catch(t){}},complete:function(t){}},t)},500))})},detached:function(t){console.log("移除============")},methods:{roundRect:function(t,e,i,n,a,o){t.beginPath(),t.setFillStyle("transparent"),t.arc(e+o,i+o,o,Math.PI,1.5*Math.PI),t.moveTo(e+o,i),t.lineTo(e+n-o,i),t.lineTo(e+n,i+o),t.arc(e+n-o,i+o,o,1.5*Math.PI,2*Math.PI),t.lineTo(e+n,i+a-o),t.lineTo(e+n-o,i+a),t.arc(e+n-o,i+a-o,o,0,.5*Math.PI),t.lineTo(e+o,i+a),t.lineTo(e,i+a-o),t.arc(e+o,i+a-o,o,.5*Math.PI,Math.PI),t.lineTo(e,i+o),t.lineTo(e+o,i),t.closePath(),t.fill(),t.save(),t.clip()},createImgResource:function(e){return new Promise(function(i,n){(0,t._post)("v1/groupActivity/getMoviePlayBill",{img_url:e},"获取趣满满图片地址",!1).then(function(t){return t.result.url}).then(function(t){wx.downloadFile({url:t,complete:function(t){t.errMsg.indexOf("ok")>-1?i(t.tempFilePath):n("图片加载失败")}})})})},storkeText:function(t,e){var i=this.data.group_price,n=this.data.price,a=this.data.font_color,o=t.split("");o.length>15&&o.splice(15,o.length,"..."),e.setFontSize(16),e.setFillStyle("#000");var r=null,l=93,s=0;o.forEach(function(t,i){i>7?(r=157+16*s,l=116,s++):r=157+16*i,e.fillText(t,r,l)}),e.setFontSize(18),e.setFillStyle(a),e.fillText("拼团价￥"+i,157,150),e.setFontSize(14),e.setFillStyle("#838383"),e.fillText("原价￥"+n,157,175),e.beginPath(),e.setLineWidth(1),e.setStrokeStyle("#838383"),e.moveTo(157,170),e.lineTo(157+e.measureText("原价￥"+n).width,170),e.stroke()}}}); 
 			}); 	require("component/sharecanvas/sharecanvas.js");
 		__wxRoute = 'pages/index/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/index/index.js';	define("pages/index/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function e(e,a,i){return a in e?Object.defineProperty(e,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[a]=i,e}var a=require("../../utils/tools.js"),i=getApp();Page({data:{pageLoading:!0,movieCurrent:0,cinamerPage:0,order:"pos",regionname:"0",bannerActive:0,regionnameText:"全部区域",orderText:"离我最近",orderArr:[{text:"离我最近",order:"pos"},{text:"价格最低",order:"price"}]},onPullDownRefresh:function(){i.setPageUid(this),this.setData({cinamerPage:0,cinamerHasNo:!1}),wx.removeStorageSync("indexCache"),Promise.all([this.getCinamer(),this.getMovieAndBanner(),this.getMoveAd()]).then(function(){wx.stopPullDownRefresh()})},onReachBottom:function(){this.getCinamer()},openSheet:function(e){var a=this;new Promise(function(e){void 0==a.data.region?a.getregion().then(function(){e()}):e()}).then(function(){if("region"===e.currentTarget.dataset.type){var i=a.data.showRegin;a.data.showOrder?a.setData({showOrder:!1},function(){setTimeout(function(){a.setData({showRegin:!i})},500)}):a.setData({showRegin:!i})}else{var t=a.data.showOrder;a.data.showRegin?a.setData({showRegin:!1},function(){setTimeout(function(){a.setData({showOrder:!t})},500)}):a.setData({showOrder:!t})}})},checkregion:function(e){var a=e.currentTarget.dataset.etype,i=e.currentTarget.dataset.name;if("region"==a){var t=this.data.regionname;if(t==i||"0"===t&&"全部区域"==i)return void this.setData({showRegin:!1});this.setData({regionname:"全部区域"==i?"0":i,regionnameText:i,showRegin:!1})}else{var n=e.currentTarget.dataset.text;if(this.data.order==i)return void this.setData({showOrder:!1});this.setData({order:i,orderText:n,showOrder:!1})}this.setData({cinamerPage:0,cinamerHasNo:!1,cinemas:[]}),this.getCinamer()},onLoad:function(e){var a=this;i.setPageColor(this),i.setPageUid(this).then(function(){return"1"===e.location||i.getLocation()}).then(function(){i.setPageCityId(a);var t=e.from;if(t){var n=null;switch(t){case"moviedetail":n="/pages/moviedetail/moviedetail?movieid="+e.movieid;break;case"tail":n="/pages/orderdetails/orderdetails?orderid="+e.orderid+"&movieName="+e.movieName;break;case"sharecoupon":n="/usercoupon/pages/give/give?actid="+e.actid;break;case"moviedetail_a":n="/subpackages/activepage/pages/moviedetail_a/moviedetail_a?movieid="+e.movieid+"&type="+e.type}wx.navigateTo({url:n})}return a.getMovieAndBanner()}).then(function(){Promise.all([a.getCinamer(),a.getMoveAd()])})},getMovieAndBanner:function(){var e=this;return new Promise(function(i){new Promise(function(i){var t=null,n=wx.getStorageSync("indexCache"),o=null;""!=n&&(n=JSON.parse(n),console.log("有缓存---"),o=Math.round((new Date).getTime()/1e3)-n.timeTap>86400),""==n||o?(console.log("缓存为空或者缓存已经过期"),(0,a._post)("v3/recommend/recommend",{uid:e.data.uid,cityid:e.data.cityid},"获取首页影片与banner",!1).then(function(e){var a=JSON.stringify({resData:e,timeTap:Math.round((new Date).getTime()/1e3)});wx.setStorage({key:"indexCache",data:a}),i(e)})):(console.log("调用缓存",n),t=n.resData,i(t))}).then(function(a){try{var t=a.moviess,n=[],o=[];if(t.length>0){t.forEach(function(e,a){n.push({name:e.name,grade:e.grade,type:e.movietype2,starring:e.starring,mtime:e.mtime,like:e.like,id:Number(e.id),pic:e.pic})}),n=JSON.stringify(n),o=JSON.parse(n);var r=e.data.movieCurrent;o.forEach(function(e,a){0==r&&a>5&&(e.pic="/images/zhanwei.png")})}var s=a.activities;e.data.movieSwiper=n,e.setData({activities:s,movieClip:o,movieid:o[e.data.movieCurrent].id,pageLoading:!1}),i()}catch(a){console.log(a,"页面发生错误,数据不符"),e.setData({pageError:!0,pageLoading:!1})}})})},getCinamer:function(){var e=this;if(!this.data.cinamerHasNo){var i=this.data.cinamerPage,t={uid:this.data.uid,cityid:this.data.cityid,movieid:this.data.movieid?this.data.movieid:0,pos:wx.getStorageSync("location"),order:this.data.order,regionname:this.data.regionname,page:i,step:10},n=JSON.parse(JSON.stringify(t));return i+=1,n.page=i,new Promise(function(o){Promise.all([(0,a._post)("v2/recommend/cinemas",t,"获取影院列表",!1,!0),(0,a._post)("v2/recommend/cinemas",n,"再请求一次-获取影院列表",!1,!0)]).then(function(a){var t=a[0],n=a[1];n.cinemas.length>0&&(t.cinemas=t.cinemas.concat(n.cinemas)),n.collection.length>0&&(t.collection=t.collection.concat(n.collection)),n.xiaoma.length>0&&(t.xiaoma=t.xiaoma.concat(n.xiaoma));var r=[],s=t.cinemas,c=[],d=[];if(1===i){var m=t.collection;m&&m.forEach(function(a){c.push({name:a.name,address:a.address,length:a.length,labels:a.labels,group_lable:a.group_lable,price:a.price,channelicon:a.channelicon,cinemaid:a.id,isMyLike:1,movieid:e.data.movieid?e.data.movieid:0})});var l=t.xiaoma;l&&l.forEach(function(a){d.push({name:a.name,address:a.address,length:a.length,labels:a.labels,group_lable:a.group_lable,price:a.price,channelicon:a.channelicon,cinemaid:a.id,isThird:1,movieid:e.data.movieid?e.data.movieid:0})})}s.forEach(function(a){r.push({name:a.name,address:a.address,length:a.length,labels:a.labels,group_lable:a.group_lable,price:a.price,channelicon:a.channelicon,cinemaid:a.id,movieid:e.data.movieid?e.data.movieid:0})});var g=1==i?d.concat(c.concat(r)):e.data.cinemas.concat(r);e.setData({cinemas:g,cinamerPage:i+1}),0==n.cinemas.length&&0==n.collection.length&&0==n.xiaoma.length&&e.setData({cinamerHasNo:!0}),o()}).catch(function(a){wx.showModal({content:a.errMsg?a.errMsg+"~":a,cancelText:"知道了",confirmText:"立即重试",success:function(a){a.confirm?e.getCinamer():e.setData({cinamerHasNo:!0})}})})})}},getMoveAd:function(){var e=this;return new Promise(function(i){(0,a._post)("v1/AdminAdvertPlace/suspendAdvert",{},"获取悬浮广告",!1).then(function(a){if(1==a.ishow){var t=a.data;e.setData({moveAdIcon:t.icon,moveAdText:t.text,moveAdType:t.type,moveAdUrl:t.url,moveAdAppid:t.appid||""})}i()})})},getregion:function(){var e=this;return new Promise(function(i){(0,a._post)("v1/movie/cityregions",{uid:e.data.uid,cityid:e.data.cityid},"获取区域信息",!1).then(function(a){var t=a.result;t.unshift({cityid:"0",regionname:"全部区域"}),e.setData({region:t}),i()})})},tapSwiper:function(e){var a=e.currentTarget.dataset.index;a!=this.data.movieCurrent?this.setData({movieCurrent:a}):this.goMovieDetail()},goMovieDetail:function(){this.data.changing||wx.navigateTo({url:"/pages/moviedetail/moviedetail?movieid="+this.data.movieid})},swiperchange:function(e,a){var i,t=0;return function(){var n=this,o=arguments;i&&(this.data.cinemas.length>0?this.setData({cinemas:[],changing:!0}):this.setData({changing:!0}),t++,clearTimeout(i));var r=!i;i=setTimeout(function(){t>0&&(e.apply(n,o),t=null),i=null},a),r&&e.apply(n,o)}}(function(a){var i=this,t="touch"==a.detail.source?a.detail.current:this.data.movieCurrent,n=this.data.movieClip,o=n[t].id;"touch"==a.detail.source&&this.setData({movieCurrent:t});var r=!1;if(t>=3)for(var s=JSON.parse(this.data.movieSwiper),c=t-2,d=t+2>=n.length?n.length:t+2,m=c;m<d;m++){var l=n[m];"/images/zhanwei.png"==l.pic&&(r=!0,l.pic=s[m].pic)}var g=wx.createSelectorQuery();new Promise(function(e,a){g.select(".movieCommend").fields({scrollOffset:!0},function(a){wx.pageScrollTo({scrollTop:a.scrollTop}),setTimeout(function(){e()},300)}).exec()}).then(function(){var a;i.setData((a={cinamerPage:0,cinemas:[],cinamerHasNo:!1},e(a,r?"movieClip":"s",r?n:""),e(a,"movieid",o),e(a,"changing",!1),a)),i.getCinamer()})},1e3),bannerChange:function(e){this.setData({bannerActive:e.detail.current})},onShareAppMessage:function(){return{title:"一键比价，优惠多多，省时省钱",imageUrl:"https://manfile1.oss-cn-beijing.aliyuncs.com/image/xiaochengxu/zhuyefenxiangtu.png"}},touchmove:function(e){var a=e.touches[0];this.setData({top:a.clientY-35+"px",left:a.clientX-35+"px"})},imgerror:function(e){var a=e.currentTarget.dataset.index,i=this.data.movieClip;i[a].pic="/images/zhanwei_err.png",this.setData({movieClip:i}),console.log(e,"==error")}}); 
 			}); 	require("pages/index/index.js");
 		__wxRoute = 'pages/viewCard/viewCard';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/viewCard/viewCard.js';	define("pages/viewCard/viewCard.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),a=getApp();Page({data:{},onLoad:function(t){a.setPageColor(this),a.setPageUid(this),this.getCoupon()},cancode:function(){var t=this;console.log(111),wx.scanCode({success:function(a){console.log(a);var e=a.result;t.setData({card_no:e}),t.addCard()}})},getCoupon:function(){var a=this;(0,t._post)("v1/movieCard/getMyCardList",{user_id:this.data.uid},"获取观影卡列表",!1).then(function(e){var i=e.result,o=i.explain_text.split("\n"),n=i.purchase_tel;i.card_list.forEach(function(a,e){a.from="viewcard",a.index=e;var i=1e3*Number(a.end_time);a.expire_time=(0,t.formatTime)(new Date(i))}),a.setData({msg:o,phone:n,cardlist:i.card_list})})},inputKey:function(t){var a=t.detail.value;this.setData({card_no:a})},addCard:function(){var a=this,e=this.data.card_no;""!=(e=e?e.trim():"")?(0,t._post)("v1/movieCard/cardBinding",{user_id:this.data.uid,card_no:e}).then(function(t){wx.showToast({title:t.msg,icon:"none",success:function(){200==t.code&&a.onLoad()}})}):wx.showToast({title:"请输入兑换码",icon:"none"})},cardview:function(t){var a=t.detail.index,e=this.data.cardlist[a].rules;wx.showModal({title:"使用规则",content:e,showCancel:!1,confirmText:"知道了"})}}); 
 			}); 	require("pages/viewCard/viewCard.js");
 		__wxRoute = 'pages/movies/movies';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/movies/movies.js';	define("pages/movies/movies.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var e=require("../../utils/tools.js"),a=getApp();Page({data:{actionSheetHidden:!0,userInfo:{},soon:0,hotPage:0,featurePage:0,hotMovie:null,featureMovie:null,isFirstLoad:!0,selectBack:null,movieList1HasNo:!1},handleToSearch:function(){wx.navigateTo({url:"../search/search?cityid="+this.data.cityid})},onLoad:function(){var t=this;a.setPageColor(this),a.setPageUid(this).then(function(){return""!=wx.getStorageSync("location")||a.getLocation()}).then(function(){a.setPageCityId(t),t.loadData()})},bindViewTap:function(t){var e=this,a=t.currentTarget.dataset.soon;wx.pageScrollTo({scrollTop:0,duration:0}),this.setData({soon:Number(a)},function(){e.loadData()})},onPullDownRefresh:function(){var e,a=this.data.soon;this.setData((e={},t(e,0===a?"hotPage":"featurePage",0),t(e,0===a?"hotMovieHasNo":"featureMovieHasNo",0),e)),this.loadData().then(function(){wx.stopPullDownRefresh()})},onReachBottom:function(){this.loadData()},loadData:function(){var t=this;return new Promise(function(a){var o=t.data.soon,i=null,n=null;if(0===o){if(t.data.hotMovieHasNo)return void console.log("正在热映的影片已无数据");i="v2/movies/get_showing_movies",n=t.data.hotPage}if(1===o){if(t.data.featureMovieHasNo)return void console.log("即将上映影片已无数据");i="v2/movies/get_latershow_movies",n=t.data.featurePage}var s={uid:t.data.uid,cityid:t.data.cityid,page:n};(0,e._post)(i,s,"获取电影列表",!1).then(function(e){if(0===o){var i=e.movies;t.setData({hotMovie:0==n?i:t.data.hotMovie.concat(i),hotPage:n+1}),0==i.length&&t.setData({hotMovieHasNo:!0})}else if(1===o){if(void 0==e.count||0==e.count||0==e.months.length||void 0==e.months)return void t.setData({featureMovieHasNo:!0});var s=e.months[0].dates,r=null;if(0==n)r=s;else{var u=t.data.featureMovie,c=u[u.length-1],l=s[0];c.date==l.date&&(c.movies=c.movies.concat(l.movies),s.shift()),r=u.concat(s)}r.forEach(function(t){var e=t.date;t.movies.forEach(function(t){t.date=e})}),t.setData({featureMovie:r,featurePage:n+1})}a()}).catch(function(e){console.log(e,"--页面发生错误"),t.setData({hotMovieHasNo:!0,featureMovieHasNo:!0})})})},togo:function(t){var e=t.currentTarget.dataset.movie.id,a=t.currentTarget.dataset.movie.name;wx.navigateTo({url:"../cinema/cinema?movieid="+e+"&movieName="+a})},onShareAppMessage:function(t){return{title:"最近片单奉上，总有一部适合你~~~"}}}); 
 			}); 	require("pages/movies/movies.js");
 		__wxRoute = 'pages/webbiew/webbiew';__wxRouteBegin = true; 	define("pages/webbiew/webbiew.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{},onLoad:function(n){var o=n.url;this.setData({url:o})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){}}); 
 			}); 	require("pages/webbiew/webbiew.js");
 		__wxRoute = 'pages/actors/actors';__wxRouteBegin = true; 	define("pages/actors/actors.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{actors:[],index:[]},handleErrImg:function(a){var t=a.currentTarget.dataset.index,s=this.data.actors;s[t].img="/images/actorsDefault.png",this.setData({actors:s})},onLoad:function(a){this.setData({actors:JSON.parse(a.actors)})}}); 
 			}); 	require("pages/actors/actors.js");
 		__wxRoute = 'pages/map/map';__wxRouteBegin = true; 	define("pages/map/map.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{longitude:0,latitude:0},onLoad:function(t){var o=this;this.setData({markers:[{iconPath:"/images/btoPosAc.png",id:0,latitude:t.latitude,longitude:t.longitude,width:20,height:20}],options:t}),this.mapCtx=wx.createMapContext("myMap"),new Promise(function(t,e){wx.getLocation({type:"gcj02",success:function(e){console.log(o,"-="),o.setData({longitude:e.longitude,latitude:e.latitude}),o.mapCtx.moveToLocation(),t(e)}})}).then(function(t){console.log(t);var e=o,i={url:"https://apis.map.qq.com/ws/direction/v1/walking/?from="+t.latitude+","+t.longitude+"&to="+e.data.options.latitude+","+e.data.options.longitude+"&key=5TBBZ-ZI2WU-Q7CVG-4J4GO-Y2Z5H-TWBZY",method:"GET",dataType:"json",success:function(t){var o=t.data;if(0==o.status){for(var i=o.result.routes[0].polyline,a=[],n=2;n<i.length;n++)i[n]=Number(i[n-2])+Number(i[n])/1e6;for(n=0;n<i.length;n+=2)a.push({latitude:i[n],longitude:i[n+1]});e.setData({polyline:[{points:a,color:"#3385ffAA",width:5}]})}}};wx.request(i)})},onReady:function(){},dingweidian:function(){this.mapCtx.moveToLocation()}}); 
 			}); 	require("pages/map/map.js");
 		__wxRoute = 'pages/pay/pay';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/pay/pay.js';	define("pages/pay/pay.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var e,o=require("../../utils/tools.js"),a=getApp();Page({data:(e={orderinfor:"",timeFlag:1,minute:"",second:"",orderid:"",openid:"",sumprice:"",radio:0,actionStatus:!0,showBto:!1,page:0},t(e,"radio",""),t(e,"idInfo",[]),t(e,"cdname",""),t(e,"cdType",[]),t(e,"cdChannel",[]),t(e,"kindArr",[]),t(e,"codeDes","获取验证码"),t(e,"code",""),t(e,"phone",""),t(e,"time",60),t(e,"cdkey",""),t(e,"codeStatus",!1),t(e,"isStatus",null),t(e,"indexInfo",[]),t(e,"count",[]),t(e,"cdkeyid",""),t(e,"timer",null),t(e,"timerStatus",null),e),handleToMore:function(){},removeArritem:function(t,e){return t.forEach(function(o,a){o==e&&t.splice(a,1)}),t},radioChange:function(t){console.log(t,"==");var e=t.detail,o=e.id,a=e.channel,i=e.type,n=this.data.lottery,d=this.data.orderinfor.number,s=function(){n.forEach(function(t){1==t.is&&(t.is=0)})},r=function(){n.forEach(function(t){t.id==o&&t.cdkey_channel==a&&t.cdkey_type==i&&0==t.is&&(t.is=1)})};0==n.length?console.log("null"):n.forEach(function(t,e){if(t.id==o&&t.cdkey_channel==a&&t.cdkey_type==i&&1==t.is)t.is=0;else if(t.id==o&&t.cdkey_channel==a&&t.cdkey_type==i&&0==t.is)if(2!=t.userkey_type||1==d)s(),r();else{var c=n.filter(function(t){return 1==t.is});c.length>0&&2!=c[0].userkey_type?(s(),r()):c.length==d?wx.showToast({icon:"none",title:"最多可选"+d+"张通兑券",duration:1e3}):r()}}),this.setData({lottery:n}),console.log(this.data.lottery)},addDiscount:function(){this.setData({showBto:!this.data.showBto})},confirmUse:function(t){var e=this;if("card"!==t.currentTarget.dataset.use){var a=this.data.orderinfor.number,i=this.data.lottery,n="",d="",s="",r="",c=[];if(i.forEach(function(t,e){1==t.is&&c.push(t)}),0==c.length?(n=0,d=0,s=0):c.forEach(function(t,e){n=0==e?t.id:n+","+t.id,d=0==e?t.cdkey_channel:d+","+t.cdkey_channel,s=0==e?t.cdkey_type:s+","+t.cdkey_type,r+=t.userkey_type}),-1!=r.indexOf(1)&&-1!=r.indexOf(2))return wx.showModal({title:"提示",content:"红包与优惠券不能同时使用",showCancel:!1}),console.log(i,c),!1;if(c.length>a)return wx.showModal({title:"提示",content:"优惠券使用数量大于购买座位数",showCancel:!1}),console.log(i,c),!1;if("11"==r)return wx.showModal({title:"提示",content:"红包只能使用一个",showCancel:!1}),console.log(i,c),!1;(0,o._post)("v1/movieticket/unsetordercdkeyid",{cdkeyid:n,cdkey_channel:d,cdkey_type:s,orderid:this.data.orderid,uid:this.data.uid},"使用优惠券").then(function(t){e.setData({orderinfor:t,orderid:t.orderid}),e.setData({actionStatus:!e.data.actionStatus})})}else{var u=this.data.cardlist.filter(function(t){return 1==t.is_selected});u=u[0],console.log(u,"==");var h={cdkeyid:0,cdkey_channel:0,cdkey_type:0,orderid:this.data.orderid,card_id:u?u.card_id:0,uid:this.data.uid};(0,o._post)("v1/movieticket/unsetordercdkeyid",h,"使用观影卡").then(function(t){e.setData({orderinfor:t,orderid:t.orderid}),e.setData({actionStatus:!e.data.actionStatus})})}},actionSheetbindchange:function(){this.setData({actionStatus:!this.data.actionStatus})},listenerRadioGroup:function(t){console.log(t.detail.value)},handleToDiscount:function(){var t=this;(0,o._post)("v1/user/user_lottery",{cdkeyid:this.data.orderinfor.cdkey.cdkeyid,cdkey_channel:this.data.orderinfor.cdkey.cdkey_channel,cdkey_type:this.data.orderinfor.cdkey.cdkey_type,uid:this.data.uid,page:this.data.page,orderid:this.data.orderid}).then(function(e){var o=e.lottery;if(t.setData({showCard:!1}),0==o.length)console.log("no"),t.setData({showBto:!0});else{var a=[],i=[],n=[],d=[],s=[];e.lottery.forEach(function(t){t.from="pay",2==t.status?a.push(t):1==t.status?i.push(t):3==t.status?n.push(t):0==t.status&&(1==t.is?s.push(t):d.push(t))});var r=s.concat(d).concat(n).concat(a).concat(i);t.setData({lottery:r})}t.actionSheetbindchange()})},handleToMovieCard:function(){var t=this;(0,o._post)("v1/movieCard/getUsableCard",{user_id:this.data.uid,orderid:Number(this.data.orderid)}).then(function(e){var a=e.result,i=a.usable_data,n=[];a.usable_count>0&&(i.forEach(function(t,e){t.from="pay",t.index=e;var a=1e3*Number(t.end_time);t.expire_time=(0,o.formatTime)(new Date(a)),t.status=0}),n=i),t.setData({showCard:!0,cardlist:n}),t.actionSheetbindchange()})},usecard:function(t){var e=t.detail.index,o=this.data.cardlist,a=o[e];1==a.is_selected?a.is_selected=0:(o.forEach(function(t){t.is_selected=0}),a.is_selected=1),this.setData({cardlist:o})},loadData:function(t,e,a){var i=this;console.log(t,a);var n=e,d={uid:this.data.uid,orderid:t,cdkeyid:a};(0,o._post)(n,d).then(function(t){0==t.error&&(i.setData({orderinfor:t,orderid:t.orderid}),i.getTime(t.overtime))})},onLoad:function(t){var e=this;a.setPageColor(this),console.log(t),this.setData({orderid:t.orderid,cdkeyid:t.cdkeyid}),a.setPageUid(this).then(function(){1==t.flag&&e.loadData(t.orderid,"v1/movieticket/buyticket",t.cdkeyid)})},onReady:function(){},onShow:function(){"00"!=this.data.minute&&"00"!=this.data.second&&"no"==this.data.timerStatus&&this.loadData(this.data.orderid,"v1/movieticket/buyticket",this.data.cdkeyid)},onHide:function(){this.setData({timerStatus:"no"}),clearInterval(this.data.timer)},onUnload:function(){},getTime:function(t){console.log(t,"-=-=");var e=this;if(t<0)return e.setData({timeFlag:0,minute:"00",second:"00"}),!1;e.data.timer=setInterval(function(){var o=0,a=0,i=10,n=0;t>0&&(o=Math.floor(t/86400),a=Math.floor(t/3600)-24*o,i=Math.floor(t/60)-24*o*60-60*a,n=Math.floor(t)-24*o*60*60-60*a*60-60*i),i<=9&&(i="0"+i),n<=9&&(n="0"+n),--t>0?e.setData({minute:i,second:n}):(0==t||t<0)&&e.setData({timeFlag:0,minute:"00",second:"00"})},1e3),"no"==e.data.timer&&clearInterval(e.data.timer)},confirm:function(t){var e=this,a=this.data.orderinfor.sumprice,i=this.data.orderid;if(0==this.data.timeFlag)return wx.showToast({title:"订单已超时",icon:"none"}),!1;!parseFloat(a)>0?(0,o._post)("v1/movieticket/meigonghepay",{orderid:i}).then(function(){wx.redirectTo({url:"../orderdetails/orderdetails?orderid="+i+"&movieName="+e.data.orderinfor.moviename})}):wx.login({success:function(t){(0,o._post)("v2/weixinpay/weixinpayh5",{code:t.code,orderid:i}).then(function(t){if(0==t.error&&void 0!=t.paymsg)return wx.showModal({title:"提示",content:t.paymsg,showCancel:!1}),!1;wx.requestPayment({timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(t){console.log(e.data),console.log(e.data.orderinfor),wx.redirectTo({url:"../orderdetails/orderdetails?orderid="+i+"&movieName="+e.data.orderinfor.moviename})},fail:function(t){console.log("fail:"),console.log(t)},complete:function(t){console.log("complete:"),console.log(t)}})})}})},showTooltip:function(t){wx.showModal({title:"提示",content:t})},getCdkey:function(t){this.setData({cdkey:t.detail.value})},getPhone:function(t){this.setData({phone:t.detail.value})},getCode:function(t){""==t.detail.value?this.setData({codeInput:!1}):this.setData({code:t.detail.value,codeInput:!0})},timeReduce:function(){var t=this;if(0==this.data.time)return this.setData({codeDes:"点击重新发送",time:60,codeStatus:!1,phoneInput:!1,codeInput:!1}),!1;this.setData({time:this.data.time-1,codeDes:this.data.time+"s后重新发送"}),setTimeout(function(){t.timeReduce()},1e3)},requestCode:function(){var t=this;return/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.data.phone)?!this.data.codeStatus&&void(0,o._post)("v1/user/get_sms_code",{phone:this.data.phone}).then(function(e){200===e.status&&(t.setData({codeStatus:!0}),t.timeReduce())}):(this.showTooltip("请输入正确的手机号！"),!1)},handleTakeCdkey:function(){var t=this;return console.log(this.data.uid),""===this.data.cdkey?(this.showTooltip("请输入兑换码！"),!1):""===this.data.phone?(this.showTooltip("请输入手机号！"),!1):""===this.data.code?(this.showTooltip("请输入验证码！"),!1):void(0,o._post)("v1/user/exchange_cdkey",{uid:this.data.uid,cdkey:this.data.cdkey,code:this.data.code,phone:this.data.phone}).then(function(e){0==e.msgStatus?t.showTooltip(e.msg):(t.setData({showBto:!1,actionStatus:!t.data.actionStatus}),setTimeout(function(){t.handleToDiscount()},500))})},handleCancel:function(){this.setData({showBto:!this.data.showBto,actionStatus:!this.data.actionStatus})}}); 
 			}); 	require("pages/pay/pay.js");
 		__wxRoute = 'pages/mine/mine';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/mine/mine.js';	define("pages/mine/mine.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var a=require("../../utils/tools.js"),e=getApp();Page({data:{nickName:"",avatarUrl:"",showInfo:!0,uid:"",wordAdv:[],picAdv:[],unPayOrder:{},freePay:{},wh:wx.getSystemInfoSync().windowHeight},onLoad:function(a){e.setPageColor(this)},onReady:function(){},handleToPayOrder:function(){wx.navigateTo({url:"/pages/orderdetails/orderdetails?orderid="+this.data.unPayOrder.orderid+"&movieName="+this.data.unPayOrder.moviename})},handleLogin:function(){"temp"==this.data.uidType&&this.setData({showlogin:!0})},handleToPage:function(a){if("temp"!=this.data.uidType){var e=a.currentTarget.dataset.url;wx.navigateTo({url:e})}else this.setData({showlogin:!0})},pageInit:function(){var e=this;(0,a._post)("v1/user/getUserCenterInfo",{uid:this.data.uid},"mine-adv",!1).then(function(a){e.setData({wordAdv:a.word_adver,picAdv:a.pic_adver,unPayOrder:a.unPayOrder,freePay:a.freePay})})},avatarErr:function(a){var e=wx.getStorageSync("3rd_session"),t="/images/"+this.data.colors.iconsrc+"/logo.png";e.headurl=t,this.setData({avatarUrl:t}),wx.setStorage({key:"3rd_session",data:e})},onShow:function(){var a=this;wx.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:this.data.colors.minenavcolor}),e.setPageUid(this).then(function(){if("temp"==a.data.uidType)return a.setData({nickName:"未登录",avatarUrl:"/images/"+a.data.colors.iconsrc+"/defaultLogo.png"}),void a.setData({wordAdv:[],picAdv:[],unPayOrder:{}});var e=wx.getStorageSync("3rd_session");a.setData({nickName:e.nickname,avatarUrl:e.headurl}),a.pageInit()})},onHide:function(){},onUnload:function(){},hideSheet:function(){this.setData({showlogin:!1})},loginend:function(){var a=this;e.setPageUid(this).then(function(){var e=wx.getStorageSync("3rd_session");a.setData({nickName:e.nickname,avatarUrl:e.headurl}),a.hideSheet(),a.pageInit()})}}); 
 			}); 	require("pages/mine/mine.js");
 		__wxRoute = 'pages/search/search';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/search/search.js';	define("pages/search/search.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var a=require("../../utils/tools.js"),t=getApp(),e=function(a,t){return a.replace(new RegExp(""+t,"g"),"%%"+t+"%%").split("%%")};Page({data:{searchList:wx.getStorageSync("searchList"),movieList:[],cinemaList:[],num:!0,seachvalue:"",searchFlag:!1,localstaion:wx.getStorageSync("location"),hotwords:[],searchStr:""},handleToHotSearch:function(a){var t=a.currentTarget.dataset.hot;this.setData({seachvalue:t}),this.loadData(t),console.log(a.currentTarget.dataset.hot)},onLoad:function(e){var s=this;""==this.data.searchList&&this.setData({searchFlag:!0}),(0,a._post)("v2/search/hotwordsconfig",{scene:"1"}).then(function(a){s.setData({hotwords:a.hotwords.split("#")})}),t.setPageUid(this),t.setPageCityId(this)},onReady:function(){},onShow:function(){console.log(getApp().globalData),this.setData({searchList:wx.getStorageSync("searchList")})},onHide:function(){},onUnload:function(){},bindKeyInput:function(a){var t=a.detail.value.replace(/\s+/g,"");""==t?this.setData({movieList:[],cinemaList:[],searchFlag:!1}):this.setData({searchStr:t})},wxSerchFocus:function(a){wx.getStorageSync("searchList")},wxSearchBlur:function(a){var t=this,e=a.detail.value.replace(/\s+/g,""),s=t.data.searchList.length;""==t.data.searchList&&(t.data.searchList=[]),""!=e?(s<5?t.insearchList(e)||(t.data.searchList.unshift(e),t.setData({searchList:t.data.searchList,searchFlag:!0})):t.insearchList(e)||(t.data.searchList.pop(),t.data.searchList.unshift(e),t.setData({searchList:t.data.searchList,searchFlag:!0})),wx.setStorage({key:"searchList",data:t.data.searchList}),console.log(t.data.searchList)):t.setData({movieList:[],cinemaList:[],searchFlag:!1})},handleSearch:function(a){var t=a.detail.value;""!=t&&(console.log(t),this.loadData(t))},loadData:function(t){this.setData({searchdata:t});var s=this,i={search:t,pos:wx.getStorageSync("location"),cityid:this.data.cityid,uid:this.data.uid,scene:"1"};(0,a._post)("v2/search/index",i).then(function(a){var i=null;0==a.movies.length&&0==a.cinemas.length&&wx.showModal({title:"提示",content:"暂无搜索结果...",confirmText:"知道了",showCancel:!1}),a.movies==[]&&a.cinemas==[]||(i=!1),a.movies.forEach(function(a,s){a.searchData=t,a.name_=e(a.name,t),a.starring_=e(a.director+" "+(""!=a.director&&""!=a.starring?" | ":"")+a.starring,t)}),a.cinemas.forEach(function(a,s){a.searchData=t,a.name_=e(a.name,t),a.address_=e(a.address,t)}),s.setData({movieList:a.movies,cinemaList:a.cinemas,searchFlag:!0,num:i})})},searchRequst:function(a){var t=a.target.dataset.seachstr;this.setData({seachvalue:t}),this.loadData(t)},clearHistory:function(){this.setData({searchList:[],searchFlag:!0}),wx.setStorage({key:"searchList",data:[]})},insearchList:function(a){for(var t=wx.getStorageSync("searchList"),e=t.length,s=!1,i=0;i<e;i++)if(t[i]==a){s=!0;break}return s}}); 
 			}); 	require("pages/search/search.js");
 		__wxRoute = 'pages/mycoupon/mycoupon';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/mycoupon/mycoupon.js';	define("pages/mycoupon/mycoupon.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var e=require("../../utils/tools.js"),a=getApp();Page({data:{showStatus:!1,codeStatus:!1,exchange:!1,isLoad:!0,page:0,uId:"",orderId:"",cdkey:"",code:"",phone:"",time:60,codeDes:"获取验证码",lottery:null,flag:null,hiddenmodal:!0,desc:[]},confirm:function(){this.setData({hiddenmodal:!0,exchange:!1})},handleUse:function(t){var e=t.currentTarget.dataset.desc;e=e.replace(/\\n/g,""),this.setData({hiddenmodal:!1,desc:e.split(" ")})},showTooltip:function(t){wx.showModal({title:"提示",content:t})},handleExchange:function(){this.setData({showStatus:!0})},getCdkey:function(t){this.setData({cdkey:t.detail.value})},getPhone:function(t){this.setData({phone:t.detail.value})},getCode:function(t){""==t.detail.value?this.setData({codeInput:!1}):this.setData({code:t.detail.value,codeInput:!0})},timeReduce:function(){var e=this;if(this.data.exchange){var a;return this.setData((a={time:60,cdkey:"",code:"",phone:"",codeDes:"获取验证码"},t(a,"time",60),t(a,"showStatus",!1),t(a,"codeStatus",!1),t(a,"exchange",!1),a)),!1}if(0==this.data.time)return this.setData({codeDes:"点击重新发送",time:60,codeStatus:!1,phoneInput:!1,codeInput:!1}),!1;this.setData({time:this.data.time-1,codeDes:this.data.time+"s后重新发送"}),setTimeout(function(){e.timeReduce()},1e3)},requestCode:function(){var t=this,a=/^1[3|4|5|7|8|9][0-9]\d{4,8}$/;return console.log(a.test(this.data.phone)),a.test(this.data.phone)?!this.data.codeStatus&&void(0,e._post)("v1/user/get_sms_code",{phone:this.data.phone}).then(function(e){200===e.status&&(t.setData({codeStatus:!0}),t.timeReduce())}):(this.showTooltip("请输入正确的手机号！"),!1)},getListInfo:function(){var t=this;this.data.nodata||this.data.isLoad&&(this.setData({isLoad:!1}),(0,e._post)("v1/user/user_lottery",{uid:this.data.uid,page:this.data.page,orderid:this.data.orderId,couponStatus:""}).then(function(e){var a=t.data.lottery;if(null==a)a=e.lottery;else{if(0==e.lottery.length)return void t.setData({nodata:!0});a=a.concat(e.lottery)}var o=t.couponSotr(a);t.setData({page:t.data.page+1,lottery:o,isLoad:!0})}))},handleTakeCdkey:function(){var t=this;return""===this.data.cdkey?(this.showTooltip("请输入兑换码！"),!1):""===this.data.phone?(this.showTooltip("请输入手机号！"),!1):""===this.data.code?(this.showTooltip("请输入验证码！"),!1):void(0,e._post)("v1/user/exchange_cdkey",{uid:this.data.uid,cdkey:this.data.cdkey,code:this.data.code,phone:this.data.phone}).then(function(e){if(0!=e.error||e.msg)wx.showModal({title:"提示",content:e.msg,showCancel:!1});else{wx.showModal({title:"提示",content:"兑换成功",showCancel:!1});var a=e.lottery,o=t.couponSotr(a);t.setData({lottery:o,cdkey:"",code:"",phone:"",codeDes:"获取验证码",time:60,showStatus:!1,exchange:!0})}})},onLoad:function(t){a.setPageColor(this),a.setPageUid(this),this.getListInfo()},onReady:function(){},onShow:function(){},cancelMask:function(){this.setData({showMask:!1})},bangdingCoupon:function(){this.setData({showStatus:!0,showMask:!1,cdkey:this.data.clipCoupon,phone:this.data.phone})},onHide:function(){},onUnload:function(){},handleToMore:function(){this.getListInfo()},onReachBottom:function(){},onShareAppMessage:function(){},catchmove:function(){},couponSotr:function(t){var e=[],a=[],o=[],s=[];return t.forEach(function(t){2==t.status?e.push(t):1==t.status?a.push(t):3==t.status?o.push(t):0==t.status&&s.push(t)}),s.concat(o).concat(e).concat(a)}}); 
 			}); 	require("pages/mycoupon/mycoupon.js");
 		__wxRoute = 'pages/moviedetail/moviedetail';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/moviedetail/moviedetail.js';	define("pages/moviedetail/moviedetail.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),a=getApp();Page({data:{movieId:"",movieDetails:{},img:[],video:[],maxHeight:200,height:132,gradient:!1,position:"absolute",top:0,mask:!0,commentList:[],hidden:!0,nocancel:!1,stars:[2,4,6,8,10],normalSrc:"../../images/moviedetails/dark-star.png",selectedSrc:"../../images/moviedetails/all-star.png",halfSrc:"../../images/moviedetails/half-star.png",key:0,switchType:1,btoType:"2",page:0,cinemas:null,movie:{grade:""},order:"pos",actionStatus:!0,areaNumber:null,areaInfo:[],regionname:"",comment:"",movieStatus:!0},goToShowList:function(t){var a=t.currentTarget.dataset.cinemarid,e=t.currentTarget.dataset.name;wx.navigateTo({url:"/pages/cinamermoviedetails/cinamermoviedetails?cinanmerId="+a+"&movieid="+this.data.movieId+"&ciName="+e})},handleToMovieList:function(){this.setData({switchType:1})},handleToMovieDetail:function(){this.setData({switchType:2}),this.loadData(this.data.movieId),this.getComments()},writeComment:function(){"temp"!=this.data.uidType?this.setData({hidden:!1}):this.setData({showlogin:!0})},likeMovie:function(a){if("temp"!=this.data.uidType){var e=this.data.movielike,i=a.currentTarget.dataset.like,o=this.data.movieDetails;0==i?(o.ismylike=1,e+=1,this.setData({movieDetails:o,movielike:e})):1==i&&(o.ismylike=0,e-=1,this.setData({movieDetails:o,movielike:e})),(0,t._post)("v2/movies/like",{movieid:this.data.movieDetails.movieid,uid:this.data.uid},"").then(function(t){1==t.type?wx.showToast({title:"已取消想看",duration:1500}):wx.showToast({title:"已想看",duration:1500})})}else this.setData({showlogin:!0})},cancel:function(){this.setData({hidden:!0})},confirm:function(){this.setData({hidden:!0}),(0,t._post)("v1/movie/add_comment",{movieid:this.data.movieId,uid:this.data.uid,nickname:wx.getStorageSync("nickName"),context:this.data.comment,grade:this.data.key,headmsg:wx.getStorageSync("avatarUrl"),moviename:this.data.movie.moviename,effect:"insert"},"").then(function(t){0==t.error&&wx.showToast({title:"评论成功"})})},onPullDownRefresh:function(){this.setData({page:0}),this.getCinemars().then(function(){wx.stopPullDownRefresh()})},onReachBottom:function(){var a=this;if(2!=this.data.switchType){var e=this.data.page;e+=1,this.setData({page:e}),(0,t._post)("v2/recommend/cinemas",{uid:this.data.uid,cityid:this.data.cityid,page:e,movieid:this.data.movieId,pos:wx.getStorageSync("location"),order:this.data.order,regionname:this.data.regionname,step:10},"",!1).then(function(t){var e=t.cinemas,i=a.data.cinemas.concat(e);i.forEach(function(t){t.movieid=a.data.movieId}),a.setData({cinemas:i,movie:t.movie,pingLunNum:t.movie.commentcount})})}},selectLeft:function(t){var a=t.currentTarget.dataset.key;1==this.data.key&&1==t.currentTarget.dataset.key&&(a=0),console.log("得"+a+"分"),this.setData({key:a})},selectRight:function(t){var a=t.currentTarget.dataset.key;console.log("得"+a+"分"),this.setData({key:a})},getComment:function(t){this.setData({comment:t.detail.value})},getComments:function(){var a=this;(0,t._post)("v1/movie/movie_comments_upgrade",{movieid:this.data.movieId,uid:this.data.uid},"",!1).then(function(t){a.setData({commentList:t.data.short.data,pingLunNum:t.data.short.number})})},handleSwitchType:function(t){var a=this;console.log(this.data.switchType),this.setData({page:0,bottomTagLoad:!0}),1==t.currentTarget.dataset.btotype?(this.setData({btoType:t.currentTarget.dataset.btotype,order:"price",cinemas:null}),this.getCinemars()):2==t.currentTarget.dataset.btotype?(this.setData({btoType:t.currentTarget.dataset.btotype,order:"pos",cinemas:null}),this.getCinemars()):this.setData({btoType:t.currentTarget.dataset.btotype},function(){a.getAreaInfo(),a.actionSheetbindchange()})},getAreaInfo:function(){var a=this;(0,t._post)("v1/movie/cityregions",{cityid:this.data.cityid},"").then(function(t){a.setData({areaNumber:t.number,areaInfo:t.result})})},getRegionName:function(t){var a=this;t.currentTarget.dataset.areaname!=this.data.regionname&&this.setData({regionname:t.currentTarget.dataset.areaname,cinemas:null},function(){a.getCinemars(),a.actionSheetbindchange()})},onLoad:function(t){var e=this;this.setData({movieId:t.movieid}),a.setPageColor(this),a.setPageUid(this).then(function(){a.setPageCityId(e),e.getCinemars()})},getCinemars:function(){var a=this;return new Promise(function(e,i){var o=a.data.page;(0,t._post)("v2/recommend/cinemas",{uid:a.data.uid,cityid:a.data.cityid,page:o,movieid:a.data.movieId,pos:wx.getStorageSync("location"),order:a.data.order,regionname:a.data.regionname||"0",step:10},"",!1,!0).then(function(t){var i=[];t.xiaoma.length>0&&t.xiaoma.forEach(function(t){t.isThird=1}),t.collection.length>0&&t.collection.forEach(function(t){t.isMyLike=1}),(i=0==o?t.xiaoma.concat(t.collection.concat(t.cinemas)):a.data.cinemas.concat(t.cinemas)).forEach(function(t){t.movieid=a.data.movieId}),a.setData({cinemas:i,movie:t.movie,movieStatus:!1,pingLunNum:t.movie.commentcount,movielike:t.movie.like}),0==t.cinemas.length&&0==t.collection.length&&0==t.xiaoma.length&&a.handleToMovieDetail(),e()}).catch(function(t){wx.showModal({content:t.errMsg?t.errMsg+"~":t,cancelText:"知道了",confirmText:"立即重试",success:function(t){t.confirm?a.getCinemars():a.setData({cinemas:[]})}})})})},onHide:function(){},onUnload:function(){},loadData:function(a){var e=this,i={movieid:a,uid:this.data.uid,cityid:this.data.cityid};(0,t._post)("v1/movie/movie_info",i,"",!1).then(function(t){var a=[],i=t.actors;i&&i.director&&(i.director.forEach(function(t){a.push({img:t.avatar,sc_name:t.sc_name})}),i.actors.forEach(function(t){a.push({img:t.avatar,sc_name:t.sc_name})})),e.setData({movieDetails:t,img:t.imgs.split(","),video:t.taobaovideo,actors:a})})},handleToVideo:function(){wx.navigateTo({url:"/pages/performerOrDrama/performerOrDrama?img="+JSON.stringify(this.data.img)+"&title=视频与剧照&video="+JSON.stringify(this.data.video)+"&pic="+this.data.movieDetails.bigpic})},handleToActors:function(){wx.navigateTo({url:"/pages/actors/actors?actors="+JSON.stringify(this.data.actors)+"&title=演职人员"})},previewImage:function(t){var a=t.currentTarget.dataset.url,e=[];"yanyuan"==t.currentTarget.dataset.flag?this.data.actors.forEach(function(t){e.push(t.img)}):e=this.data.img,console.log(t),wx.previewImage({current:a,urls:e})},open:function(){this.data.gradient?this.setData({maxHeight:200,height:132,gradient:!1,position:"absolute",top:0}):this.setData({maxHeight:"auto",height:"auto",gradient:!0,position:"static",top:20})},maskHidden:function(t){var a=this,e="";e=2==t.target.id,a.setData({mask:e})},actionSheetbindchange:function(){this.setData({actionStatus:!this.data.actionStatus})},onShareAppMessage:function(t){return{title:"《"+this.data.movie.moviename+"》上映啦，赶快来比价抢票吧!",path:"/pages/index/index?from=moviedetail&movieid="+this.data.movieId}},myCatchTouch:function(){},hideSheet:function(){this.setData({showlogin:!1})},loginend:function(){a.setPageUid(this),this.setData({showlogin:!1})},handleErrImg:function(t){console.log(t);var a=this.data.movie;a.pic="/images/zhanwei.png",this.setData({movie:a})},handErrActorImg:function(t){console.log("actors",t);var a=this.data.actors;a[t.currentTarget.dataset.index].img="/images/actorsDefault.png",this.setData({actors:a})},handlePlaysErrImg:function(t){console.log("plays",t);var a=this.data.img;a[t.currentTarget.dataset.index].img="/images/playsDefault.png",this.setData({img:a})}}); 
 			}); 	require("pages/moviedetail/moviedetail.js");
 		__wxRoute = 'pages/changeAcount/changeAcount';__wxRouteBegin = true; 	define("pages/changeAcount/changeAcount.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var n=require("../../utils/tools.js"),e=getApp();Page({data:{nickName:"",avatarUrl:"",wxlogin:!1,phonelogin:!1,hidden:null},handleToPhoneLogin:function(){wx.navigateTo({url:"/pages/phoneLogin/phoneLogin"})},getUserInfoFun:function(){wx.login({success:function(e){wx.getUserInfo({success:function(o){(0,n.loginFn)("wechat",{userinfo:o,wxlogin:e}).then(function(){wx.switchTab({url:"/pages/index/index"})})}})}})},loginOut:function(){wx.removeStorageSync("3rd_session"),e.setPageUid(this),this.setData({nickName:"未登录",avatarUrl:"../../images/"+this.data.colors.iconsrc+"/defaultLogo.png",wxlogin:!1,phonelogin:!1,hidden:!1})},onLoad:function(n){e.setPageColor(this)},onShow:function(){var n=wx.getStorageSync("3rd_session"),e=n.nickname,o=n.headurl;this.setData({nickName:e,avatarUrl:o,wxlogin:"wechat"==n.login_type,phonelogin:"wechat"!=n.login_type,hidden:!0})}}); 
 			}); 	require("pages/changeAcount/changeAcount.js");
 		__wxRoute = 'pages/phoneLogin/phoneLogin';__wxRouteBegin = true; 	define("pages/phoneLogin/phoneLogin.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),e=getApp();Page({data:{phone:"",codeStatus:!1,code:"",codeDes:"获取验证码",time:60},showTooltip:function(t){wx.showModal({title:"提示",content:t})},getPhone:function(t){this.setData({phone:t.detail.value,phoneInput:!0})},getCode:function(t){""==t.detail.value?this.setData({codeInput:!1}):this.setData({code:t.detail.value,codeInput:!0})},timeReduce:function(){var t=this;if(0==this.data.time)return this.setData({codeDes:"点击重新发送",time:60,codeStatus:!1,phoneInput:!1,codeInput:!1}),!1;this.setData({time:this.data.time-1,codeDes:this.data.time+"s后重新发送"}),setTimeout(function(){t.timeReduce()},1e3)},requestCode:function(){var e=this,o=/^1[3|4|5|7|8|9][0-9]\d{4,8}$/;return console.log(o.test(this.data.phone)),o.test(this.data.phone)?!this.data.codeStatus&&void(0,t._post)("v1/user/get_sms_code",{phone:this.data.phone}).then(function(t){200===t.status&&(e.setData({codeStatus:!0}),e.timeReduce())}):(this.showTooltip("请输入正确的手机号！"),!1)},login:function(){var e=/^1[3|4|5|7|8|9][0-9]\d{4,8}$/;if(console.log(e.test(this.data.phone)),!e.test(this.data.phone))return this.showTooltip("请输入正确的手机号！"),!1;if(""==this.data.code)return this.showTooltip("请输入验证码"),!1;var o={phone:this.data.phone,code:this.data.code,iconsrc:this.data.colors.iconsrc};(0,t.loginFn)("phone",o).then(function(t){"error"==t?wx.showModal({title:"提示",content:"登录失败，请核对信息是否填写完整正确。",showCancel:!1}):wx.switchTab({url:"/pages/index/index"})})},onLoad:function(t){e.setPageColor(this)},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){}}); 
 			}); 	require("pages/phoneLogin/phoneLogin.js");
 		__wxRoute = 'pages/myorder/myorder';__wxRouteBegin = true; 	define("pages/myorder/myorder.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),a=getApp();Page({data:{userInfo:{},uid:"",orderList:[],hasMoreNum:!0,page:0,loadingText:"加载更多..."},picerror:function(t){console.log(t,"图片错误")},onLoad:function(t){var o=this;a.setPageColor(this),a.setPageUid(this).then(function(){o.loadData(0)})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){this.data.hasMoreNum&&(this.setData({page:this.data.page+1}),this.loadData(this.data.page))},loadData:function(a){var o=this;(0,t._post)("v1/movieticket/usertickets",{page:a,uid:o.data.uid,source:"movie"}).then(function(t){0!=t.usertickets.length?(o.data.orderList.push(t.usertickets),o.setData({orderList:o.data.orderList})):o.setData({loadingText:"暂无更多订单",hasMoreNum:!1})})}}); 
 			}); 	require("pages/myorder/myorder.js");
 		__wxRoute = 'pages/seat/seat';__wxRouteBegin = true; 	define("pages/seat/seat.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,e){var a=void 0;return function(){var o=this,i=arguments;a&&clearTimeout(a),a=setTimeout(function(){t.apply(o,i),a=null},e)}}var e=require("../../utils/tools.js"),a=getApp(),o=null;Page({data:{autoInput:!1,cinanmerName:"",cinamerid:"",moviename:"",movieid:"",type:"",playid:"",palytime:"",hallname:"",halltype:"",price:"",seatdata:[],seatmaptype:"",rowArr:[],colArr:[],scale:1,seatid:[],userPhone:"",userid:"",mask:!0,uid:"",cityid:"",confirmFlag:0,scaleValue:.7,colWidth:36,colHeight:60,seatArr:{isloveSeat:1,chooseSeat:[]}},onShow:function(){var t=this;if(this.data.navBack)wx.navigateBack({delta:1});else{this.data.group_id&&this.getGroupTime();var a=(0,e.formatTime)(new Date(1e3*Number(this.data.opt.playid)));Promise.all([(0,e._post)("v1/groupActivity/getUnPayOrder",{uid:this.data.uid},"是否有未支付尾款订单"),(0,e._post)("v2/userticket/ifuserticket",{uid:this.data.uid,buydatatype:"9",type:this.data.type,movieid:this.data.movieid,cinemaid:this.data.cinamerid,playtime:a},"是否有未支付订单")]).then(function(e){var a=e[0].result,o=e[1];1!=a.status?0==o.status&&t.order_pay(o):t.group_tail(a)})}},group_tail:function(t){wx.showModal({title:"温馨提示",content:"您有一笔拼团尾款未支付，需支付后才可购买其他电影票",showCancel:!1,confirmText:"去支付",success:function(e){wx.navigateTo({url:"/pages/orderdetails/orderdetails?orderid="+t.orderid+"&movieName="+t.moviename})}})},order_pay:function(t){var a=this;wx.showModal({title:"温馨提示",content:"您有未支付订单，是否去支付？",cancelText:"取消订单",confirmText:"去支付",success:function(o){o.confirm?wx.navigateTo({url:"/pages/pay/pay?orderid="+t.data.orderid+"&movieName="+t.data.moviename+"&flag=1"}):(0,e._post)("v1/movieticket/user_ticket_del",{uid:a.data.uid,orderid:t.data.orderid}).then(function(t){wx.hideLoading(),1==t.delete?wx.showToast({title:"取消订单成功"}):wx.showToast({title:"取消订单失败"}),a.setData({seatArr:{isloveSeat:1,chooseSeat:[]}}),a.onLoad(a.data.opt)})}})},handleAutoInput:function(){this.setData({autoInput:!0})},onLoad:function(t){a.setPageColor(this),a.setPageUid(this),console.log(t,"-=-=opt"),wx.showLoading({title:"正在加载"}),wx.setNavigationBarTitle({title:t.cinanmerName,hallName:t.hallname});var e=new Date(1e3*wx.getStorageSync("selectDate")),o=e.getMonth()+1+"月"+e.getDate()+"日  "+t.playtime,i=t.typeseat,n=t.cinanmerid,s=t.movieid,l=t.playid,r=t.type,d=t.cityid,c="daigou/index/9/"+i+"/"+n+"/"+s+"/"+l+"/"+r+"/"+d+"/?falg=1";this.setData({opt:t,group_id:!!t.group_id&&t.group_id,group_playtime:t.playtime,SeatplayTime:t.playtime,movieid:s,cinamerid:n,type:r,playid:l,moviename:t.moviename,cinanmerName:t.cinanmerName,palytime:o,hallname:t.hallname,halltype:t.halltype,price:t.price,userPhone:wx.getStorageSync("userpjone"),cityid:d}),this.loadData(c,"")},getPhone:function(t){this.setData({userPhone:t.detail.value})},cheackPhone:function(t){var e=/^((1[3-9]{1})+\d{9})$/;return!(11!=(t=t.replace(/\s+/g,"")).length||!e.test(t))},getGroupTime:function(){var t=this;(0,e._post)("v1/groupActivity/getGroupFinishInfo",{play_time:this.data.group_playtime,group_id:Number(this.data.group_id)},"获取团购结束时间").then(function(a){var i=a.result.finish_time;o=setInterval(function(){0==--i&&(clearInterval(o),wx.showToast({title:"拼团结束",icon:"none"}),wx.navigateBack({delta:1})),t.setData({timeStr:(0,e.cleantime)(i)})},1e3)})},loadData:function(t,a){var o=this,i={typeid:this.data.opt.typeid,typeseat:this.data.opt.typeseat,cinemaid:this.data.cinamerid,movieid:this.data.movieid,playid:this.data.playid,type:this.data.type,cityid:this.data.cityid,uid:this.data.uid};(0,e._post)("v2/seat/map",i).then(function(t){1===t.error?(wx.showToast({title:"该场次已取消",mask:!0,icon:"none"}),setTimeout(function(){wx.navigateBack({delta:1})},1500)):(o.seatTransformation(t),wx.hideLoading())})},seatTransformation:function(t){function e(t,a){if(4!=a[t].status||1==a[t].status||0==a[t].status){var o=a[t].name;p.push(o.slice(0,o.indexOf("排")))}else e(t+1,a)}console.log(t,"---data座位图");var a=t.result.data,o=[],i=0,n=0,s=[];a.forEach(function(t,e){t.nameArr=t.name.split("排"),t.rowIndex=Number(t.rowIndex),t.columnIndex=Number(t.columnIndex),t.rowIndex>i&&(i=t.rowIndex),t.columnIndex>n&&(n=t.columnIndex)});for(var l=0;l<i;l++)!function(t){s[t]=[],a.forEach(function(e,a){var o=e.rowIndex,i=e.columnIndex;t+1==o&&(s[t][i]=e)})}(l);for(var r=0;r<n+1;r++)o.push(r);for(var d=0;d<s.length;d++)for(var c=s[d],h=0;h<c.length;h++){var u=c[h];void 0==u&&(u={name:"空",status:4,seatId:0},s[d][h]=u)}s.forEach(function(t,e){t.forEach(function(t,a){1==t.loveFlag&&void 0==t.loveSeat&&(t.loveSeat="left",s[e][a+1].loveSeat="right")})}),console.log(s,"=========");var p=[];s.forEach(function(t,a){0==t.length?p.push(" "):e(0,t)}),this.setData({seatmaptype:t.result.seatmaptype,seatdata:s,colData:p,colArr:o,notice:t.result.notice||""}),wx.createSelectorQuery().select("#movable-view-box").boundingClientRect(function(t){console.log(t);var e=t.height,a=t.width,o=30*this.data.seatdata.length+18,i=wx.getSystemInfoSync().windowWidth;this.data.movableBoxWidth=a,this.data.phoneWidth=i,a>i&&this.setData({seatX:-(t.width/2-i/2),movableHeight:e>o?"100%":60*this.data.seatdata.length+36+"rpx"})}.bind(this)).exec()},touchmove:function(t){console.log(t)},seatchoose:function(t){var e=this;console.log(t,"-=-=-=");var a=this.data.seatdata,o=t.currentTarget.dataset.seat.split(",");o.forEach(function(t,e){o[e]=Number(t)});var i=a[o[0]][o[1]],n=this.data.seatArr,s=n.chooseSeat.length;if(void 0==i.checked)if(s>2||2==s)wx.showToast({title:"最多购买两张",icon:"none"});else{if(1==i.loveFlag){if(console.log(s,"===len"),s>0)return void wx.showToast({title:"最多购买两张",icon:"none"});n.isloveSeat=0,a[o[0]]["left"==i.loveSeat?o[1]+1:o[1]-1].checked="1"}i.checked="1",1!=this.data.scaleValue&&(this.setData({scaleValue:1,hiddenCol:!0}),setTimeout(function(){e.setData({seatX:80-t.currentTarget.offsetLeft,seatY:-t.currentTarget.offsetTop})},500))}else 1==i.loveFlag?(n.isloveSeat=1,i.checked=void 0,a[o[0]]["left"==i.loveSeat?o[1]+1:o[1]-1].checked=void 0):i.checked=void 0;n.chooseSeat=[],a.forEach(function(t){t.forEach(function(t){"1"===t.checked&&n.chooseSeat.push(t)})}),this.setData({seatdata:a,seatArr:n})},confirm:function(){wx.showLoading({title:"下单中..."});var t=this,a=t.data.seatArr.isloveSeat,o="",i=(t.data.uid,t.data.userPhone),n="",s=[];if((d=t.data.seatdata).forEach(function(t){t.forEach(function(t){1==t.checked&&s.push(t)})}),1==t.data.confirmFlag)return!1;if(!t.cheackPhone(i))return t.setData({confirmFlag:0,phonesheet:!0,phone_focus:!0}),wx.showToast({title:"输入正确手机号",duration:2e3}),!1;if(wx.setStorageSync("userpjone",i),0==s.length)return wx.showToast({title:"还没有选座位哦",duration:2e3}),t.setData({confirmFlag:0}),!1;if(!this.testingSeat())return wx.showToast({title:"请不要留下空座",duration:2e3}),t.setData({confirmFlag:0}),!1;for(var l=[],r=0;r<s.length;r++)r==s.length-1?(o+=s[r].name,n+=s[r].seatId):(o+=s[r].name+",",n+=s[r].seatId+","),0==s[r].unLikeSeat?0==s[r].typeseat?l.push("cgv"):l.push("yuliu"):l.push("common");var d={uid:t.data.uid,cinemaid:t.data.cinamerid,buydatatype:"9",phone:i,movieid:t.data.movieid,seatmaptype:t.data.seatmaptype,type:t.data.type,ticketid:o,seatid:n,loveseat:a,time:t.data.playid,singprice:t.data.price,typeseat:l.join(","),price:t.data.price*t.data.seatArr.chooseSeat.length,cdkeyid:"0",group_buy_id:t.data.opt.group_id?Number(t.data.opt.group_id):0};t.setData({confirmFlag:1});(0,e._post)("v1/movieticket/buyticket",d).then(function(e){if(0!=e){if(wx.hideLoading(),"success"!=e.msg)return wx.showModal({title:"提示",content:"座位已被购买，请重新选择座位。"}),void t.setData({confirmFlag:0});if(1==e.error);else if(0==e.buy)return wx.showToast({title:e.msg,duration:2e3}),t.setData({autoInput:!0}),!1;if(!t.cheackPhone(i))return t.setData({confirmFlag:0}),wx.showToast({title:"输入正确手机号",duration:2e3}),!1;var a=Date.parse(new Date);wx.setStorage({key:"orderTimeStamp",data:a}),wx.setStorage({key:"orderinfor",data:e,success:function(t){wx.hideLoading(),wx.navigateTo({url:"../pay/pay?orderid="+e.orderid+"&flag=1&cdkeyid="+e.cdkey.cdkeyid})},fail:function(t){},complete:function(e){t.setData({confirmFlag:0})}})}else wx.showModal({title:"提示",content:"下单错误"})})},testingSeat:function(){function t(t){var e=t[1],a=i[t[0]];return console.log(t,"--单独选择的座位"),console.log(a,"--同行座位"),{leftFirst:a[e-1],leftSecond:a[e-2],rightFirst:a[e+1],rightSecond:a[e+2]}}function e(t){var e=t.leftFirst,a=t.leftSecond,o=t.rightFirst,i=t.rightSecond;return console.log(e,"---所选座位左边第一个"),console.log(a,"---所选座位左边第二个"),console.log(o,"---所选座位右边第一个"),console.log(i,"---所选座位右边第二个"),e&&1==e.status?(console.log("左边第一个卖出,可以卖"),!0):o&&1==o.status?(console.log("右边第一个卖出,可以卖"),!0):void 0==o||4==o.status?(console.log("右边贴近边缘,可以卖"),!0):void 0==e||4==e.status?(console.log("左边贴近边缘,可以卖"),!0):a&&1==a.status?(console.log("左边第二个有卖出,不能卖"),!1):i&&1==i.status?(console.log("右边第二个有卖出,不能卖"),!1):void 0==i||4==i.status?(console.log("右边距离边缘空了一个,不能卖"),!1):void 0==a||4==a.status?(console.log("左边距离边缘空了一个,不能卖"),!1):(console.log("左右第一个都没有卖出,左右第二个都没有卖出"),!0)}var a=this.data.seatArr;console.log(a,"----seatArr");var o=!0;if(0==a.isloveSeat)return console.log("情侣座,可以直接通过"),o;var i=this.data.seatdata;if(1==a.chooseSeat.length){var n=a.chooseSeat[0];o=e(t([n.rowIndex-1,n.columnIndex]))}else{var s=a.chooseSeat;if(console.log(s,"------选择的座位"),s[0].rowIndex!==s[1].rowIndex){var l=e(t([s[0].rowIndex-1,s[0].columnIndex])),r=e(t([s[1].rowIndex-1,s[1].columnIndex]));console.log("不在一排",l,r),l&&r||(console.log("有不通过的座位,无法出售"),o=!1)}else{var d=s[0].columnIndex,c=s[1].columnIndex,h=1===Math.abs(d-c),u=Math.abs(d-c)>2,p=i[s[0].rowIndex-1];if(console.log("选择了座位的同行座位: ",p),!h&&!u){var f=[d,c].sort(function(t,e){return t-e});console.log(f,"");var m=p[f[0]+1];return console.log("选择座位中间夹着的座位: ",m),0==m.status?(console.log("中间夹了一个可以售出的座位,无法下单"),!1):(console.log("中间夹了无法出售的座位,可以下单"),!0)}if(h){var g=[d,c].sort(function(t,e){return t-e});console.log(g,"----选择的列坐标数组"),o=e({leftFirst:p[g[0]-1],leftSecond:p[g[0]-2],rightFirst:p[g[1]+1],rightSecond:p[g[1]+2]})}else{var v=e(t([s[0].rowIndex-1,s[0].columnIndex])),y=e(t([s[1].rowIndex-1,s[1].columnIndex]));console.log("选择了中间距离超过两个的座位",v,y),v&&y||(console.log("有不通过的座位,无法出售"),o=!1)}}}return console.log(o,"-----canbuy"),o},changeScreenings:function(){var t=this;this.data.playData?this.setData({mask:!1}):(0,e._post)("v2/movies/plays",{hasday:1,movieid:this.data.movieid,cinemanid:this.data.cinamerid,day:this.data.playid}).then(function(e){var a=e.plays,o=[],i=t.data.SeatplayTime;a.forEach(function(t){i!=t.playtime&&o.push(t)}),o.length>0?t.setData({mask:!1,playData:o}):wx.showToast({title:"暂无其他场次"})})},changeScreeningData:function(t){var o=this,i=t.currentTarget.dataset.playdata;console.log("更换场次数据==",i);var n=this;console.log(this.data.opt,"-=-=-=");var s=this.data.opt;s.show_playtime=i.weekindex+" "+i.hourindex,s.halltype=i.halltype,s.price=i.price,s.maxPrice=i.maxprice,n.setData({mask:!0,type:i.diffchannels[0].type,playid:i.diffchannels[0].playid,palytime:i.playtime,hallname:i.hallname,halltype:i.halltype,price:i.price,SeatplayTime:i.playtime,opt:s});var l={typeid:i.diffchannels[0].typeid,typeseat:i.diffchannels[0].typeseat,cinemaid:n.data.cinamerid,movieid:n.data.movieid,playid:i.diffchannels[0].playid,type:i.diffchannels[0].type,cityid:n.data.cityid,uid:n.data.uid};(0,e._post)("v2/seat/map",l).then(function(t){0!=i.diffchannels[0].group_actid&&(o.setData({group_id:i.diffchannels[0].group_actid,group_playtime:i.datetime+" "+i.playtime}),o.getGroupTime()),1!=t.error?n.seatTransformation(t):(a.showLoading(t.errorMsg),setTimeout(function(){wx.hideLoading()},800))})},maskHidden:function(){this.setData({mask:!0})},onReady:function(){},onHide:function(t){clearInterval(this.data.interval)},onChange:t(function(t){console.log(t.detail,"--change"),wx.createSelectorQuery().select("#movable-view-box").boundingClientRect(function(e){var a=e.width;this.data.movableBoxWidth=a,a>this.data.phoneWidth?this.setData({colpaileft:Math.abs(t.detail.x)/this.data.scaleValue,hiddenCol:!1}):this.setData({colpaileft:0,hiddenCol:!1})}.bind(this)).exec()},300),onScale:t(function(t){console.log(t,"---scale");var e=t.detail.scale;this.setData({scaleValue:e,colpaileft:Math.abs(t.detail.x)/e})},500),bestSeat:function(){wx.createSelectorQuery().select(".seat-map").fields({size:!0},function(t){console.log(t,"-=-=");var e=t.width/this.data.scaleValue*(1/3),a=t.height/this.data.scaleValue*(1/3);this.setData({boxWidth:e,boxHeight:a}),console.log(e,a,"-=-=ww")}.bind(this)).exec()},telBlur:function(){this.setData({phonesheet:!1,phone_focus:!1})},showPhoneSheet:function(){this.setData({phonesheet:!0,phone_focus:!0})},savephone:function(){var t=this.data.userPhone;this.cheackPhone(t)?(wx.setStorageSync("userpjone",t),this.setData({phonesheet:!1,phone_focus:!1,userPhone:t})):wx.showToast({title:"输入正确手机号",duration:2e3})}}); 
 			}); 	require("pages/seat/seat.js");
 		__wxRoute = 'pages/viedo/viedo';__wxRouteBegin = true; 	define("pages/viedo/viedo.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{viedoList:[]},onLoad:function(o){console.log(o.viedo),this.setData({viedoList:o.viedo})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){}}); 
 			}); 	require("pages/viedo/viedo.js");
 		__wxRoute = 'pages/orderdetails/orderdetails';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/orderdetails/orderdetails.js';	define("pages/orderdetails/orderdetails.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),e=getApp(),a=null,i=null;Page({data:{moviename:"",orderid:"",uid:"",orderinfo:{},cinamLat:"",cianmLon:"",hiddenmodal:!0,desMsg:"",sms:[],flag:null,timeStr:"0天00:00:00",text:[]},takeclip:function(t){var e=this,a=(t=t.currentTarget.dataset).piaoma,i=t.index;wx.setClipboardData({data:a,success:function(){wx.showToast({title:"复制成功"}),e.setData({clipactive:i})}})},smstouchend:function(t){this.setData({clipactive:-1})},onLoad:function(a){var i=this,n=getCurrentPages(),o=n[n.length-2];o&&"pages/seat/seat"==o.route&&o.setData({navBack:!0}),e.setPageColor(this),e.setPageUid(this),this.setData({moviename:a.movieName,orderid:a.orderid});var s={uid:this.data.uid,orderid:this.data.orderid};(0,t._post)("v1/movieticket/user_ticket_info",s,"获取订单详情").then(function(t){0==t.error&&(i.setPageData(t),5==t.status&&i.pollingOrder())})},pollingOrder:function(){var e=this;i=setTimeout(function(){var a={uid:e.data.uid,orderid:e.data.orderid};(0,t._post)("v1/movieticket/user_ticket_info",a,"获取订单详情",!1).then(function(t){0==t.error?5!=t.status?(2==t.status&&wx.showToast({title:"出票成功！"}),e.setPageData(t)):e.pollingOrder():wx.showModal({title:"加载失败",content:t.errMsg||"请点击左上角返回后返回重新打开本页面",showCancel:!1,confirmText:"知道了"})})},5e3)},setPageData:function(e){var i=this,n=e.pos.split(","),o=e.sms.split("\n"),s=e.text.split("#");this.setData({orderinfo:e,sms:o,cinamLat:n[1],cinamLon:n[0],text:s});var r=e.finish_time;0==r||(a=setInterval(function(){r--,i.setData({finish_time:r,timeStr:(0,t.cleantime)(r)}),0==r&&clearInterval(a)},1e3))},draw:function(t){console.log(t),this.setData({drawpath:t.detail.path})},onShareAppMessage:function(){var t=this.data.orderinfo;if(t.groupid>0&&void 0!=t.groupid&&t.finish_time>0){var e=this.data.uid,a=JSON.stringify(t.share_param);return console.log("group/pages/groupinfo/groupinfo?transData="+a+"&from=share&share_uid="+e),{title:"我正在参加《"+t.moviename+"》的拼团活动",path:"group/pages/groupinfo/groupinfo?transData="+a+"&from=share&share_uid="+e,imageUrl:this.data.drawpath}}return{title:"一键比价，优惠多多，省时省钱",path:"/pages/index/index",imageUrl:"https://manfile1.oss-cn-beijing.aliyuncs.com/image/xiaochengxu/zhuyefenxiangtu.png"}},openMap:function(t){console.log(t);var e=this;wx.openLocation({latitude:Number(t.currentTarget.dataset.lat),longitude:Number(t.currentTarget.dataset.lon),scale:28,name:e.data.orderinfo.cinemaname,success:function(t){console.log(t)}})},makePhoneCall:function(t){console.log(t.target.dataset.tel),wx.makePhoneCall({phoneNumber:t.target.dataset.tel})},backmoney:function(){wx.showModal({title:"提示",content:this.data.orderinfo.text_content,showCancel:!1,confirmText:"知道了"})},paytail:function(){var e=this;wx.login({success:function(a){(0,t._post)("v2/weixinpay/weixinpayh5",{code:a.code,orderid:e.data.orderid,is_tail:1}).then(function(t){if(0==t.error&&void 0!=t.paymsg)return wx.showModal({title:"提示",content:t.paymsg,showCancel:!1}),!1;wx.requestPayment({timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(t){e.setData({tail_end:!0})},fail:function(t){console.log("fail:"),console.log(t)}})})}})},onUnload:function(){5==this.data.orderinfo.status&&clearTimeout(i)}}); 
 			}); 	require("pages/orderdetails/orderdetails.js");
 		__wxRoute = 'pages/cinamermoviedetails/cinamermoviedetails';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/cinamermoviedetails/cinamermoviedetails.js';	define("pages/cinamermoviedetails/cinamermoviedetails.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=require("../../utils/tools.js"),a=getApp();Page({data:{cinanmerId:"",cinanmerName:"",cinemaAddress:"",movieid:"",movieName:"",moviegrade:"",movieList:[],cinemaPos:"",index:"",palyIndex:0,imgUrls:["http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg","http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg","http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"],width:"",imgUrl:"",theday:0,days:[],plays:null,indicatorDots:!1,autoplay:!1,interval:5e3,duration:1e3,ciName:"",swiperCurrent:0,iscollect:null,url:"",flag:""},handleBuy:function(e){var a=e.currentTarget.dataset.index.split(","),t=this.data.plays[a[0]],i=t.diffchannels[a[1]],n="",o="cityid="+t.cityid+"&playid="+i.playid+"&price="+i.price+"&maxPrice="+i.maxprice+"&type="+i.type+"&typeid="+i.typeid+"&typeseat="+i.typeseat+"&cinanmerid="+this.data.cinanmerId+"&movieid="+this.data.movieid+"&cinanmerName="+this.data.cinanmerName+"&moviename="+this.data.movieName+"&hallname="+t.hallname+"&halltype="+t.halltype+"&playtime="+t.playtime+"&show_playtime="+t.weekindex+" "+t.hourindex;n=0==i.group_actid||void 0==i.group_actid?"/pages/seat/seat?"+o:"../../group/pages/groupinfo/groupinfo?transData="+JSON.stringify({play_time:t.datetime+" "+t.playtime+":00",movie_id:Number(t.movieid),group_id:Number(i.group_actid),cinema_id:Number(t.cinemanid),channel_id:Number(i.channelid)})+"&from=cinamer",this.setData({url:n,flag:"buy"}),"temp"!=this.data.uidType?wx.navigateTo({url:n}):this.setData({showlogin:!0})},hideSheet:function(){this.setData({showlogin:!1})},loginend:function(){var t=this;a.setPageUid(this).then(function(){t.setData({showlogin:!1}),"buy"==t.data.flag&&wx.navigateTo({url:t.data.url}),"collect"==t.data.flag&&(0,e._post)("v2/collect/add",{uid:t.data.uid,cinemaid:t.data.cinanmerId},"",!1).then(function(e){t.setData({iscollect:1}),wx.showToast({title:"已收藏"})})})},handleCollect:function(a){var t=this;if(this.setData({flag:"collect"}),"temp"!=this.data.uidType){var i=a.currentTarget.dataset.is,n="";n=1==i?"v2/collect/del":"v2/collect/add",(0,e._post)(n,{uid:this.data.uid,cinemaid:this.data.cinanmerId},"",!1).then(function(e){1==i?(t.setData({iscollect:0}),wx.showToast({title:"已取消收藏"})):0==i?(t.setData({iscollect:1}),wx.showToast({title:"已收藏"})):e.msg&&wx.showToast({title:e.msg})})}else this.setData({showlogin:!0})},onLoad:function(e){a.setPageColor(this),a.setPageUid(this);var t=e.ciName,i=e.cinanmerId,n=void 0==e.movieid?0:e.movieid;this.setData({ciName:t,cinanmerId:i,movieid:n,cinemaAddress:e.ciAdd})},openRoad:function(e){wx.openLocation({latitude:Number(e.currentTarget.dataset.latitude),longitude:Number(e.currentTarget.dataset.longitude),scale:28,name:e.currentTarget.dataset.name,success:function(e){console.log(e)}})},onReady:function(){},onShow:function(){this.loadCinemaInfo("v1/movie/cineman_movies",this.data.cinanmerId,this.data.movieid)},onHide:function(){},onUnload:function(){},loadCinemaInfo:function(a,t,i){var n=0,o=this;(0,e._post)(a,{cinemanid:t,uid:this.data.uid},"获取场次信息",!1).then(function(e){if(wx.stopPullDownRefresh(),1==e.error)return o.setData({plays:[],pageLoaded:!0}),void wx.showModal({title:"提示",content:e.errorMsg,showCancel:!1});var a=e.movies;if(0!=a.length){a.forEach(function(e,a){0!=i?e.movieid==i&&(n=a):n=0});Number(n);var t=e.movies[n],s=e.pos.split(",");o.setData({iscollect:e.iscollect,cinemaTag:e.cinematrait,cinemaAddress:e.cinemanaddress,cinanmerName:e.cinemanname,movieList:e.movies,cinemaPos:e.pos,index:n,imgUrl:t.pic,movieName:t.moviename,moviegrade:o.grade(t),movieid:t.movieid,swiperCurrent:n,movieInfo:t.mtime+"分钟 | "+t.movietype+" | "+t.starring,cinemaPosLatitude:s[1],cinemaPosLongitude:s[0]}),o.getcinanmerdate()}else o.setData({plays:[],pageLoaded:!0})})},tapselect:function(e){var a=e.touches[0].clientX,t=this.data.centerX,i=e.target.id,n=this.data.movieList[i],o=0;console.log(this.data.moveX),o=this.data.moveX+t-a;var s=this.grade(n);this.setData({imgUrl:e.target.dataset.url,index:i,moveX:o,movieid:n.movieid,movieName:n.moviename,moviegrade:s,palyIndex:0}),this.getcinanmerdate()},selectDate:function(e){var a=e.currentTarget.dataset.index,t=null;t=a>=0&&a<=2?0:3==a?70:100*(a-3)+70;var i=e.currentTarget.id;this.setData({theday:i,plays:null,selectScroll:t}),this.getcinanmerdate(i)},getcinanmerdate:function(a){var t=this,i={cinemanid:t.data.cinanmerId,movieid:t.data.movieid};void 0!=a?(i.day=a,wx.setStorage({key:"selectDate",data:a})):i.hasday=1,(0,e._post)("v2/movies/plays",i,"",!1).then(function(e){null!=e?(e.cinemanid=t.data.cinanmerId,e.movieid=t.data.movieid,t.setData({resData:e}),e.plays.forEach(function(e){e.diffchannels.length>0&&e.diffchannels.forEach(function(a,t){e.showCinamer=!0})}),void 0==a?(t.setData({days:e.days,plays:e.plays,theday:e.days[0][0],pageLoaded:!0}),wx.setStorage({key:"selectDate",data:e.days[0][0]})):t.setData({plays:e.plays})):t.setData({plays:[],pageLoaded:!0})})},grade:function(e){var a=e.grade;return"0.0"!=a?a:0!=e.like?e.like+" 想看":"暂无评分"},palyOpen:function(e){var a=e.currentTarget.id;a==this.data.palyIndex&&(a=-1),console.log(e),this.setData({palyIndex:a})},a:function(e){console.log("禁止跳转")},swiperChange:function(e){var a=e.detail.current;this.setData({swiperCurrent:a,plays:null});var t=this.data.movieList[a],i=this.grade(t);this.setData({imgUrl:t.pic,movieid:t.movieid,movieName:t.moviename,moviegrade:i,palyIndex:0,movieInfo:t.mtime+"分钟 | "+t.movietype+" | "+t.starring}),this.getcinanmerdate()},tapSwiper:function(e){var a=e.currentTarget.dataset.index;a!=this.data.swiperCurrent?this.setData({swiperCurrent:a}):wx.navigateTo({url:"/pages/moviedetail/moviedetail?movieid="+this.data.movieid})},onPullDownRefresh:function(){this.loadCinemaInfo("v1/movie/cineman_movies",this.data.cinanmerId,this.data.movieid)},handleErrImg:function(e){var a=this.data.movieList;a[e.currentTarget.dataset.index].pic="/images/zhanwei.png",this.setData({movieList:a})}}); 
 			}); 	require("pages/cinamermoviedetails/cinamermoviedetails.js");
 		__wxRoute = 'pages/aboutus/aboutus';__wxRouteBegin = true; 	define("pages/aboutus/aboutus.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp();Page({data:{},onLoad:function(a){t.setPageColor(this)}}); 
 			}); 	require("pages/aboutus/aboutus.js");
 		__wxRoute = 'pages/item/citylist/citylist';__wxRouteBegin = true; 	define("pages/item/citylist/citylist.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";getApp();Page({data:{nowCity:"",clitylist:"",hotcity:"",cityFirstl:"",selcity:""},onLoad:function(t){var e=this,a=[];wx.setNavigationBarTitle({title:"当前城市-"+t.city});var o=wx.getStorageSync("locationStorage");this.setData({nowCity:o.local.cityname,nowCityId:o.local.cityid,selcity:void 0==o.select?o.local.cityname:o.select.cityname,selcityId:void 0==o.select?o.local.cityid:o.select.cityid}),wx.getStorage({key:"citydata",success:function(t){t.data=JSON.parse(t.data);for(var o="",c=0;c<t.data.letter.length;c++)o=t.data.letter[c].firstletter,-1==a.indexOf(o)&&a.push(o);e.setData({clitylist:t.data.letter,hotcity:t.data.hot,cityFirstl:a})}})},goName:function(t){console.log(t);var e=t.currentTarget.dataset.id;console.log(e);var a=wx.createSelectorQuery().select("#"+e);console.log(a),a.fields({rect:!0},function(t){console.log(t),wx.pageScrollTo({scrollTop:t.top})}).exec()},seleCity:function(t){var e=t.currentTarget.id,a=t.currentTarget.dataset.name;if(a!=this.data.selcity){var o=wx.getStorageSync("locationStorage");o.select={cityid:e,cityname:a},wx.setStorageSync("locationStorage",o),wx.removeStorageSync("indexCache");var c=getCurrentPages()[0].route;wx.reLaunch({url:"/"+c+"?location=1"})}else wx.navigateBack({delta:1})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){}}); 
 			}); 	require("pages/item/citylist/citylist.js");
 		__wxRoute = 'pages/performerOrDrama/performerOrDrama';__wxRouteBegin = true; 	define("pages/performerOrDrama/performerOrDrama.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{info:[],img:[],video:[],pic:""},onLoad:function(t){this.setData({info:t.actors?JSON.parse(t.actors):[],img:t.img?JSON.parse(t.img):[],video:t.video?JSON.parse(t.video):[],pic:t.pic}),wx.setNavigationBarTitle({title:t.title})},previewImg:function(t){wx.previewImage({current:t.currentTarget.dataset.img,urls:[t.currentTarget.dataset.img]})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){}}); 
 			}); 	require("pages/performerOrDrama/performerOrDrama.js");
 		__wxRoute = 'pages/likemovie/likemovie';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/likemovie/likemovie.js';	define("pages/likemovie/likemovie.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),i=getApp();Page({data:{},onLoad:function(t){i.setPageUid(this),i.setPageCityId(this)},onShow:function(){this.getMovie()},onReachBottom:function(){},getMovie:function(){var i=this;(0,t._post)("v2/movies/user_like_movies",{cityid:this.data.cityid,uid:this.data.uid},"获取收藏的影片").then(function(t){t.dates&&t.dates.length>0?i.setData({movies:t.dates}):i.setData({hasnone:!0})})}}); 
 			}); 	require("pages/likemovie/likemovie.js");
 		__wxRoute = 'pages/likecinamer/likecinamer';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/likecinamer/likecinamer.js';	define("pages/likecinamer/likecinamer.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=require("../../utils/tools.js"),a=getApp();Page({data:{},page:0,onLoad:function(){a.setPageUid(this),this.location=wx.getStorageSync("location")},onShow:function(){var a=this;(0,t._post)("v2/movies/collect",{uid:this.data.uid,page:this.page,step:100,pos:this.location},"获取收藏的影院").then(function(t){t.cinemas&&t.cinemas.length>0?a.setData({cinemas:t.cinemas}):a.setData({hasnone:!0})})}}); 
 			}); 	require("pages/likecinamer/likecinamer.js");
 	