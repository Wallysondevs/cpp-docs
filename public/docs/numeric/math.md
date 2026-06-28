# Funções matemáticas comuns

### Funções  
  
Definidas no header `[<cstdlib>](<#/doc/header/cstdlib>)`  
---  
[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(desde C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)   
(função)  
[ div(int)ldivlldiv](<#/doc/numeric/math/div>)(desde C++11) | calcula o quociente e o resto da divisão inteira   
(função)  
Definidas no header `[<cinttypes>](<#/doc/header/cinttypes>)`  
[ abs(std::intmax_t)imaxabs](<#/doc/numeric/math/abs>)(desde C++11)(desde C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)   
(função)  
[ div(std::intmax_t)imaxdiv](<#/doc/numeric/math/div>)(desde C++11)(desde C++11) | calcula o quociente e o resto da divisão inteira   
(função)  
Definidas no header `[<cmath>](<#/doc/header/cmath>)`  
  
##### Operações básicas   
  
[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(desde C++11)(desde C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)   
(função)  
[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(desde C++11)(desde C++11) | resto da operação de divisão de ponto flutuante   
(função)  
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(desde C++11)(desde C++11)(desde C++11) | resto com sinal da operação de divisão   
(função)  
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(desde C++11)(desde C++11)(desde C++11) | resto com sinal, bem como os três últimos bits da operação de divisão   
(função)  
[ fmafmaffmal](<#/doc/numeric/math/fma>)(desde C++11)(desde C++11)(desde C++11) | operação de multiplicação-adição fundida   
(função)  
[ fmaxfmaxffmaxl](<#/doc/numeric/math/fmax>)(desde C++11)(desde C++11)(desde C++11) | o maior de dois valores de ponto flutuante   
(função)  
[ fminfminffminl](<#/doc/numeric/math/fmin>)(desde C++11)(desde C++11)(desde C++11) | o menor de dois valores de ponto flutuante   
(função)  
[ fdimfdimffdiml](<#/doc/numeric/math/fdim>)(desde C++11)(desde C++11)(desde C++11) | diferença positiva de dois valores de ponto flutuante (\\({\small\max{(0, x-y)}}\\)max(0, x-y))   
(função)  
[ nannanfnanl](<#/doc/numeric/math/nan.2>)(desde C++11)(desde C++11)(desde C++11) | não-é-um-número (NaN)   
(função)  
  
##### Funções exponenciais   
  
[ expexpfexpl](<#/doc/numeric/math/exp>)(desde C++11)(desde C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)   
(função)  
[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(desde C++11)(desde C++11)(desde C++11) | retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)   
(função)  
[ expm1expm1fexpm1l](<#/doc/numeric/math/expm1>)(desde C++11)(desde C++11)(desde C++11) | retorna e elevado à potência dada, menos 1 (\\({\small e^x-1}\\)ex-1)   
(função)  
[ loglogflogl](<#/doc/numeric/math/log>)(desde C++11)(desde C++11) | calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))   
(função)  
[ log10log10flog10l](<#/doc/numeric/math/log10>)(desde C++11)(desde C++11) | calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))   
(função)  
[ log2log2flog2l](<#/doc/numeric/math/log2>)(desde C++11)(desde C++11)(desde C++11) | logaritmo de base 2 do número dado (\\({\small\log_{2}{x}}\\)log2(x))   
(função)  
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(desde C++11)(desde C++11)(desde C++11) | logaritmo natural (base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))   
(função)  
  
##### Funções de potência   
  
[ powpowfpowl](<#/doc/numeric/math/pow>)(desde C++11)(desde C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)   
(função)  
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(desde C++11)(desde C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)   
(função)  
[ cbrtcbrtfcbrtl](<#/doc/numeric/math/cbrt>)(desde C++11)(desde C++11)(desde C++11) | calcula a raiz cúbica (\\(\small{\sqrt[3]{x}}\\)3√x)   
(função)  
[ hypothypotfhypotl](<#/doc/numeric/math/hypot>)(desde C++11)(desde C++11)(desde C++11) | calcula a hipotenusa \\(\scriptsize{\sqrt{x^2+y^2}}\\)√x2  
+y2  
e \\(\scriptsize{\sqrt{x^2+y^2+z^2}}\\)√x2  
+y2  
+z2  
(desde C++17)   
(função)  
  
##### Funções trigonométricas   
  
[ sinsinfsinl](<#/doc/numeric/math/sin>)(desde C++11)(desde C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))   
(função)  
[ coscosfcosl](<#/doc/numeric/math/cos>)(desde C++11)(desde C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))   
(função)  
[ tantanftanl](<#/doc/numeric/math/tan>)(desde C++11)(desde C++11) | calcula a tangente (\\({\small\tan{x}}\\)tan(x))   
(função)  
[ asinasinfasinl](<#/doc/numeric/math/asin>)(desde C++11)(desde C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))   
(função)  
[ acosacosfacosl](<#/doc/numeric/math/acos>)(desde C++11)(desde C++11) | calcula o arco cosseno (\\({\small\arccos{x}}\\)arccos(x))   
(função)  
[ atanatanfatanl](<#/doc/numeric/math/atan>)(desde C++11)(desde C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))   
(função)  
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(desde C++11)(desde C++11) | arco tangente, usando sinais para determinar os quadrantes   
(função)  
  
##### Funções hiperbólicas   
  
[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(desde C++11)(desde C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))   
(função)  
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(desde C++11)(desde C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))   
(função)  
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(desde C++11)(desde C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))   
(função)  
[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(desde C++11)(desde C++11)(desde C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))   
(função)  
[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(desde C++11)(desde C++11)(desde C++11) | calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))   
(função)  
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(desde C++11)(desde C++11)(desde C++11) | calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))   
(função)  
  
##### Funções de erro e gama   
  
[ erferfferfl](<#/doc/numeric/math/erf>)(desde C++11)(desde C++11)(desde C++11) | função de erro   
(função)  
[ erfcerfcferfcl](<#/doc/numeric/math/erfc>)(desde C++11)(desde C++11)(desde C++11) | função de erro complementar   
(função)  
[ tgammatgammaftgammal](<#/doc/numeric/math/tgamma>)(desde C++11)(desde C++11)(desde C++11) | função gama   
(função)  
[ lgammalgammaflgammal](<#/doc/numeric/math/lgamma>)(desde C++11)(desde C++11)(desde C++11) | logaritmo natural da função gama   
(função)  
  
##### Operações de ponto flutuante para o inteiro mais próximo   
  
[ ceilceilfceill](<#/doc/numeric/math/ceil>)(desde C++11)(desde C++11) | inteiro mais próximo não menor que o valor dado   
(função)  
[ floorfloorffloorl](<#/doc/numeric/math/floor>)(desde C++11)(desde C++11) | inteiro mais próximo não maior que o valor dado   
(função)  
[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(desde C++11)(desde C++11)(desde C++11) | inteiro mais próximo não maior em magnitude que o valor dado   
(função)  
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio termo   
(função)  
[ nearbyintnearbyintfnearbyintl](<#/doc/numeric/math/nearbyint>)(desde C++11)(desde C++11)(desde C++11) | inteiro mais próximo usando o modo de arredondamento atual   
(função)  
[ rintrintfrintllrintlrintflrintlllrintllrintfllrintl](<#/doc/numeric/math/rint>)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | inteiro mais próximo usando o modo de arredondamento atual com exceção se o resultado for diferente   
(função)  
  
##### Funções de manipulação de ponto flutuante   
  
[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(desde C++11)(desde C++11) | decompõe um número em mantissa e expoente de base 2   
(função)  
[ ldexpldexpfldexpl](<#/doc/numeric/math/ldexp>)(desde C++11)(desde C++11) | multiplica um número por 2 elevado a uma potência integral   
(função)  
[ modfmodffmodfl](<#/doc/numeric/math/modf>)(desde C++11)(desde C++11) | decompõe um número em partes inteira e fracionária   
(função)  
[ scalbnscalbnfscalbnlscalblnscalblnfscalblnl](<#/doc/numeric/math/scalbn>)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | multiplica um número por [FLT_RADIX](<#/doc/types/climits>) elevado a uma potência   
(função)  
[ ilogbilogbfilogbl](<#/doc/numeric/math/ilogb>)(desde C++11)(desde C++11)(desde C++11) | extrai o expoente do número   
(função)  
[ logblogbflogbl](<#/doc/numeric/math/logb>)(desde C++11)(desde C++11)(desde C++11) | extrai o expoente do número   
(função)  
[ nextafternextafterfnextafterlnexttowardnexttowardfnexttowardl](<#/doc/numeric/math/nextafter>)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | próximo valor de ponto flutuante representável em direção ao valor dado   
(função)  
[ copysigncopysignfcopysignl](<#/doc/numeric/math/copysign>)(desde C++11)(desde C++11)(desde C++11) | copia o sinal de um valor de ponto flutuante   
(função)  
  
##### Classificação e comparação   
  
[ fpclassify](<#/doc/numeric/math/fpclassify>)(desde C++11) | categoriza o valor de ponto flutuante dado   
(função)  
[ isfinite](<#/doc/numeric/math/isfinite>)(desde C++11) | verifica se o número dado tem valor finito   
(função)  
[ isinf](<#/doc/numeric/math/isinf>)(desde C++11) | verifica se o número dado é infinito   
(função)  
[ isnan](<#/doc/numeric/math/isnan>)(desde C++11) | verifica se o número dado é NaN   
(função)  
[ isnormal](<#/doc/numeric/math/isnormal>)(desde C++11) | verifica se o número dado é normal   
(função)  
[ signbit](<#/doc/numeric/math/signbit>)(desde C++11) | verifica se o número dado é negativo   
(função)  
[ isgreater](<#/doc/numeric/math/isgreater>)(desde C++11) | verifica se o primeiro argumento de ponto flutuante é maior que o segundo   
(função)  
[ isgreaterequal](<#/doc/numeric/math/isgreaterequal>)(desde C++11) | verifica se o primeiro argumento de ponto flutuante é maior ou igual ao segundo   
(função)  
[ isless](<#/doc/numeric/math/isless>)(desde C++11) | verifica se o primeiro argumento de ponto flutuante é menor que o segundo   
(função)  
[ islessequal](<#/doc/numeric/math/islessequal>)(desde C++11) | verifica se o primeiro argumento de ponto flutuante é menor ou igual ao segundo   
(função)  
[ islessgreater](<#/doc/numeric/math/islessgreater>)(desde C++11) | verifica se o primeiro argumento de ponto flutuante é menor ou maior que o segundo   
(função)  
[ isunordered](<#/doc/numeric/math/isunordered>)(desde C++11) | verifica se dois valores de ponto flutuante são não ordenados   
(função)  
  
### Tipos

Definidos no header `[<cstdlib>](<#/doc/header/cstdlib>)`  
---  
[ div_t](<#/doc/numeric/math/div>) | tipo de estrutura, retornado por [std::div](<#/doc/numeric/math/div>)   
(typedef)  
[ ldiv_t](<#/doc/numeric/math/div>) | tipo de estrutura, retornado por [std::ldiv](<#/doc/numeric/math/div>)   
(typedef)  
[ lldiv_t](<#/doc/numeric/math/div>)(desde C++11) | tipo de estrutura, retornado por [std::lldiv](<#/doc/numeric/math/div>)   
(typedef)  
Definidos no header `[<cinttypes>](<#/doc/header/cinttypes>)`  
[ imaxdiv_t](<#/doc/numeric/math/div>)(desde C++11) | tipo de estrutura, retornado por [std::imaxdiv](<#/doc/numeric/math/div>)   
(typedef)  
Definidos no header `[<cmath>](<#/doc/header/cmath>)`  
float_t(desde C++11) | tipo de ponto flutuante mais eficiente, pelo menos tão largo quanto float   
(typedef)  
double_t(desde C++11) | tipo de ponto flutuante mais eficiente, pelo menos tão largo quanto double   
(typedef)  
  
### Constantes de macro

Definidas no header `[<cmath>](<#/doc/header/cmath>)`  
---  
[ HUGE_VALFHUGE_VALHUGE_VALL](<#/doc/numeric/math/HUGE_VAL>)(desde C++11)(desde C++11) | indica o valor de overflow para float, double e long double, respectivamente   
(constante de macro)  
[ INFINITY](<#/doc/numeric/math/INFINITY>)(desde C++11) | avalia para infinito positivo ou o valor garantido para causar overflow em um float   
(constante de macro)  
[ NAN](<#/doc/numeric/math/NAN>)(desde C++11) | avalia para um NaN silencioso do tipo float   
(constante de macro)  
[ math_errhandlingMATH_ERRNOMATH_ERREXCEPT](<#/doc/numeric/math/math_errhandling>)(desde C++11)(desde C++11)(desde C++11) | define o mecanismo de tratamento de erros usado pelas funções matemáticas comuns   
(constante de macro)  
  
##### Classificação   
  
[ FP_NORMALFP_SUBNORMALFP_ZEROFP_INFINITEFP_NAN](<#/doc/numeric/math/FP_categories>)(desde C++11)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | indica uma categoria de ponto flutuante   
(constante de macro)  
  
### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_constexpr_cmath`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Constexpr para funções matemáticas agnósticas ao ambiente FP em [`<cmath>`](<#/doc/header/cmath>) e [`<cstdlib>`](<#/doc/header/cstdlib>)  
[`202306L`](<#/>) | (C++26) | Constexpr para a maioria das funções matemáticas em [`<cmath>`](<#/doc/header/cmath>)  
  
### Veja também

[**Funções matemáticas especiais**](<#/doc/numeric/special_functions>)  
---  
[Documentação C](<#/>) para Funções matemáticas comuns