# Header da biblioteca padrão &lt;cmath&gt;

Este header estava originalmente na biblioteca padrão C como [`<math.h>`](<#/>).

Este header faz parte da biblioteca [numeric](<#/doc/numeric>).

### Tipos

---
float_t(C++11) | tipo de ponto flutuante mais eficiente, pelo menos tão largo quanto float
(typedef)
double_t(C++11) | tipo de ponto flutuante mais eficiente, pelo menos tão largo quanto double
(typedef)

### Macros

[ HUGE_VALFHUGE_VALHUGE_VALL](<#/doc/numeric/math/HUGE_VAL>)(C++11)(C++11) | indica o valor de overflow para float, double e long double, respectivamente
(macro constante)
[ INFINITY](<#/doc/numeric/math/INFINITY>)(C++11) | avalia para infinito positivo ou o valor garantido para causar overflow em um float
(macro constante)
[ NAN](<#/doc/numeric/math/NAN>)(C++11) | avalia para um NaN silencioso do tipo float
(macro constante)
[ math_errhandlingMATH_ERRNOMATH_ERREXCEPT](<#/doc/numeric/math/math_errhandling>)(C++11)(C++11)(C++11) | define o mecanismo de tratamento de erros usado pelas funções matemáticas comuns
(macro constante)

##### Classificação

[ FP_NORMALFP_SUBNORMALFP_ZEROFP_INFINITEFP_NAN](<#/doc/numeric/math/FP_categories>)(C++11)(C++11)(C++11)(C++11)(C++11) | indica uma categoria de ponto flutuante
(macro constante)

### Funções

##### Operações básicas

[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(C++11)(C++11) | resto da operação de divisão de ponto flutuante
(função)
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) | resto com sinal da operação de divisão
(função)
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(C++11)(C++11)(C++11) | resto com sinal, bem como os três últimos bits da operação de divisão
(função)
[ fmafmaffmal](<#/doc/numeric/math/fma>)(C++11)(C++11)(C++11) | operação de multiplicação-adição fundida
(função)
[ fmaxfmaxffmaxl](<#/doc/numeric/math/fmax>)(C++11)(C++11)(C++11) | o maior de dois valores de ponto flutuante
(função)
[ fminfminffminl](<#/doc/numeric/math/fmin>)(C++11)(C++11)(C++11) | o menor de dois valores de ponto flutuante
(função)
[ fdimfdimffdiml](<#/doc/numeric/math/fdim>)(C++11)(C++11)(C++11) | diferença positiva de dois valores de ponto flutuante (\\({\small\max{(0, x-y)}}\\)max(0, x-y))
(função)
[ nannanfnanl](<#/doc/numeric/math/nan.2>)(C++11)(C++11)(C++11) | não-é-um-número (NaN)
(função)

##### Interpolação linear

[ lerp](<#/doc/numeric/lerp>)(C++20) | função de interpolação linear
(função)

##### Funções exponenciais

[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)
(função)
[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(C++11)(C++11)(C++11) | retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)
(função)
[ expm1expm1fexpm1l](<#/doc/numeric/math/expm1>)(C++11)(C++11)(C++11) | retorna e elevado à potência dada, menos 1 (\\({\small e^x-1}\\)ex-1)
(função)
[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) | calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))
(função)
[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) | calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))
(função)
[ log2log2flog2l](<#/doc/numeric/math/log2>)(C++11)(C++11)(C++11) | logaritmo de base 2 do número dado (\\({\small\log_{2}{x}}\\)log2(x))
(função)
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(C++11)(C++11)(C++11) | logaritmo natural (base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))
(função)

##### Funções de potência

[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)
(função)
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)
(função)
[ cbrtcbrtfcbrtl](<#/doc/numeric/math/cbrt>)(C++11)(C++11)(C++11) | calcula a raiz cúbica (\\(\small{\sqrt[3]{x}}\\)3√x)
(função)
[ hypothypotfhypotl](<#/doc/numeric/math/hypot>)(C++11)(C++11)(C++11) | calcula a hipotenusa \\(\scriptsize{\sqrt{x^2+y^2}}\\)√x2
+y2
e \\(\scriptsize{\sqrt{x^2+y^2+z^2}}\\)√x2
+y2
+z2
(desde C++17)
(função)

##### Funções trigonométricas

[ sinsinfsinl](<#/doc/numeric/math/sin>)(C++11)(C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ coscosfcosl](<#/doc/numeric/math/cos>)(C++11)(C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) | calcula a tangente (\\({\small\tan{x}}\\)tan(x))
(função)
[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ acosacosfacosl](<#/doc/numeric/math/acos>)(C++11)(C++11) | calcula o arco cosseno (\\({\small\arccos{x}}\\)arccos(x))
(função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(C++11)(C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(C++11)(C++11) | arco tangente, usando sinais para determinar quadrantes
(função)

##### Funções hiperbólicas

[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))
(função)
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))
(função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(C++11)(C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(C++11)(C++11)(C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))
(função)
[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(C++11)(C++11)(C++11) | calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))
(função)
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(C++11)(C++11)(C++11) | calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))
(função)

##### Funções de erro e gama

[ erferfferfl](<#/doc/numeric/math/erf>)(C++11)(C++11)(C++11) | função de erro
(função)
[ erfcerfcferfcl](<#/doc/numeric/math/erfc>)(C++11)(C++11)(C++11) | função de erro complementar
(função)
[ tgammatgammaftgammal](<#/doc/numeric/math/tgamma>)(C++11)(C++11)(C++11) | função gama
(função)
[ lgammalgammaflgammal](<#/doc/numeric/math/lgamma>)(C++11)(C++11)(C++11) | logaritmo natural da função gama
(função)

##### Operações de ponto flutuante para o inteiro mais próximo

[ ceilceilfceill](<#/doc/numeric/math/ceil>)(C++11)(C++11) | inteiro mais próximo não menor que o valor dado
(função)
[ floorfloorffloorl](<#/doc/numeric/math/floor>)(C++11)(C++11) | inteiro mais próximo não maior que o valor dado
(função)
[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) | inteiro mais próximo não maior em magnitude que o valor dado
(função)
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio-termo
(função)
[ nearbyintnearbyintfnearbyintl](<#/doc/numeric/math/nearbyint>)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual
(função)
[ rintrintfrintllrintlrintflrintlllrintllrintfllrintl](<#/doc/numeric/math/rint>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual com exceção se o resultado for diferente
(função)

##### Funções de manipulação de ponto flutuante

[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(C++11)(C++11) | decompõe um número em significando e expoente de base 2
(função)
[ ldexpldexpfldexpl](<#/doc/numeric/math/ldexp>)(C++11)(C++11) | multiplica um número por 2 elevado a uma potência inteira
(função)
[ modfmodffmodfl](<#/doc/numeric/math/modf>)(C++11)(C++11) | decompõe um número em partes inteira e fracionária
(função)
[ scalbnscalbnfscalbnlscalblnscalblnfscalblnl](<#/doc/numeric/math/scalbn>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | multiplica um número por [FLT_RADIX](<#/doc/types/climits>) elevado a uma potência
(função)
[ ilogbilogbfilogbl](<#/doc/numeric/math/ilogb>)(C++11)(C++11)(C++11) | extrai o expoente do número
(função)
[ logblogbflogbl](<#/doc/numeric/math/logb>)(C++11)(C++11)(C++11) | extrai o expoente do número
(função)
[ nextafternextafterfnextafterlnexttowardnexttowardfnexttowardl](<#/doc/numeric/math/nextafter>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | próximo valor de ponto flutuante representável em direção ao valor dado
(função)
[ copysigncopysignfcopysignl](<#/doc/numeric/math/copysign>)(C++11)(C++11)(C++11) | copia o sinal de um valor de ponto flutuante
(função)

##### Classificação e comparação

[ fpclassify](<#/doc/numeric/math/fpclassify>)(C++11) | categoriza o valor de ponto flutuante dado
(função)
[ isfinite](<#/doc/numeric/math/isfinite>)(C++11) | verifica se o número dado tem valor finito
(função)
[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número dado é infinito
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número dado é NaN
(função)
[ isnormal](<#/doc/numeric/math/isnormal>)(C++11) | verifica se o número dado é normal
(função)
[ signbit](<#/doc/numeric/math/signbit>)(C++11) | verifica se o número dado é negativo
(função)
[ isgreater](<#/doc/numeric/math/isgreater>)(C++11) | verifica se o primeiro argumento de ponto flutuante é maior que o segundo
(função)
[ isgreaterequal](<#/doc/numeric/math/isgreaterequal>)(C++11) | verifica se o primeiro argumento de ponto flutuante é maior ou igual ao segundo
(função)
[ isless](<#/doc/numeric/math/isless>)(C++11) | verifica se o primeiro argumento de ponto flutuante é menor que o segundo
(função)
[ islessequal](<#/doc/numeric/math/islessequal>)(C++11) | verifica se o primeiro argumento de ponto flutuante é menor ou igual ao segundo
(função)
[ islessgreater](<#/doc/numeric/math/islessgreater>)(C++11) | verifica se o primeiro argumento de ponto flutuante é menor ou maior que o segundo
(função)
[ isunordered](<#/doc/numeric/math/isunordered>)(C++11) | verifica se dois valores de ponto flutuante são não ordenados
(função)

##### Funções matemáticas especiais

[ assoc_laguerreassoc_laguerrefassoc_laguerrel](<#/doc/numeric/special_functions/assoc_laguerre>)(C++17)(C++17)(C++17) | polinômios de Laguerre associados
(função)
[ assoc_legendreassoc_legendrefassoc_legendrel](<#/doc/numeric/special_functions/assoc_legendre>)(C++17)(C++17)(C++17) | polinômios de Legendre associados
(função)
[ betabetafbetal](<#/doc/numeric/special_functions/beta>)(C++17)(C++17)(C++17) | função beta
(função)
[ comp_ellint_1comp_ellint_1fcomp_ellint_1l](<#/doc/numeric/special_functions/comp_ellint_1>)(C++17)(C++17)(C++17) | integral elíptica (completa) de primeira espécie
(função)
[ comp_ellint_2comp_ellint_2fcomp_ellint_2l](<#/doc/numeric/special_functions/comp_ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (completa) de segunda espécie
(função)
[ comp_ellint_3comp_ellint_3fcomp_ellint_3l](<#/doc/numeric/special_functions/comp_ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (completa) de terceira espécie
(função)
[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<#/doc/numeric/special_functions/cyl_bessel_i>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas regulares
(função)
[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (de primeira espécie)
(função)
[ cyl_bessel_kcyl_bessel_kfcyl_bessel_kl](<#/doc/numeric/special_functions/cyl_bessel_k>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas irregulares
(função)
[ cyl_neumanncyl_neumannfcyl_neumannl](<#/doc/numeric/special_functions/cyl_neumann>)(C++17)(C++17)(C++17) | funções de Neumann cilíndricas
(função)
[ ellint_1ellint_1fellint_1l](<#/doc/numeric/special_functions/ellint_1>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de primeira espécie
(função)
[ ellint_2ellint_2fellint_2l](<#/doc/numeric/special_functions/ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de segunda espécie
(função)
[ ellint_3ellint_3fellint_3l](<#/doc/numeric/special_functions/ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de terceira espécie
(função)
[ expintexpintfexpintl](<#/doc/numeric/special_functions/expint>)(C++17)(C++17)(C++17) | integral exponencial
(função)
[ hermitehermitefhermitel](<#/doc/numeric/special_functions/hermite>)(C++17)(C++17)(C++17) | polinômios de Hermite
(função)
[ legendrelegendreflegendrel](<#/doc/numeric/special_functions/legendre>)(C++17)(C++17)(C++17) | polinômios de Legendre
(função)
[ laguerrelaguerreflaguerrel](<#/doc/numeric/special_functions/laguerre>)(C++17)(C++17)(C++17) | polinômios de Laguerre
(função)
[ riemann_zetariemann_zetafriemann_zetal](<#/doc/numeric/special_functions/riemann_zeta>)(C++17)(C++17)(C++17) | função zeta de Riemann
(função)
[ sph_besselsph_besselfsph_bessell](<#/doc/numeric/special_functions/sph_bessel>)(C++17)(C++17)(C++17) | funções de Bessel esféricas (de primeira espécie)
(função)
[ sph_legendresph_legendrefsph_legendrel](<#/doc/numeric/special_functions/sph_legendre>)(C++17)(C++17)(C++17) | funções de Legendre associadas esféricas
(função)
[ sph_neumannsph_neumannfsph_neumannl](<#/doc/numeric/special_functions/sph_neumann>)(C++17)(C++17)(C++17) | funções de Neumann esféricas
(função)

### Sinopse

Para cada função com pelo menos um parâmetro do tipo /* floating-point-type */, uma sobrecarga para cada tipo de ponto flutuante cv-unqualified é fornecida, onde todos os usos de /* floating-point-type */ na assinatura da função são substituídos por esse tipo de ponto flutuante.

Para cada função com pelo menos um parâmetro do tipo /* floating-point-type */, exceto `std::abs`, sobrecargas adicionais são fornecidas para garantir que, se cada argumento correspondente a um parâmetro /* floating-point-type */ tiver um tipo aritmético, então cada um desses argumentos é efetivamente convertido para o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e a maior [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de todos esses argumentos, onde argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com a maior classificação e subclassificação existir, então a resolução de sobrecarga não resulta em um candidato utilizável das sobrecargas fornecidas.
```cpp
    namespace std {
      using float_t = /* see description */;
      using double_t = /* see description */;
    }
    
    #define HUGE_VAL /* see description */
    #define HUGE_VALF /* see description */
    #define HUGE_VALL /* see description */
    #define INFINITY /* see description */
    #define NAN /* see description */
    #define FP_INFINITE /* see description */
    #define FP_NAN /* see description */
    #define FP_NORMAL /* see description */
    #define FP_SUBNORMAL /* see description */
    #define FP_ZERO /* see description */
    #define FP_FAST_FMA /* see description */
    #define FP_FAST_FMAF /* see description */
    #define FP_FAST_FMAL /* see description */
    #define FP_ILOGB0 /* see description */
    #define FP_ILOGBNAN /* see description */
    #define MATH_ERRNO /* see description */
    #define MATH_ERREXCEPT /* see description */
    
    #define math_errhandling /* see description */
    
    namespace std {
      /* floating-point-type */ acos(/* floating-point-type */ x);
      float acosf(float x);
      long double acosl(long double x);
    
      /* floating-point-type */ asin(/* floating-point-type */ x);
      float asinf(float x);
      long double asinl(long double x);
    
      /* floating-point-type */ atan(/* floating-point-type */ x);
      float atanf(float x);
      long double atanl(long double x);
    
      /* floating-point-type */ atan2(/* floating-point-type */ y,
                                      /* floating-point-type */ x);
      float atan2f(float y, float x);
      long double atan2l(long double y, long double x);
    
      /* floating-point-type */ cos(/* floating-point-type */e x);
      float cosf(float x);
      long double cosl(long double x);
    
      /* floating-point-type */ sin(/* floating-point-type */ x);
      float sinf(float x);
      long double sinl(long double x);
    
      /* floating-point-type */ tan(/* floating-point-type */ x);
      float tanf(float x);
      long double tanl(long double x);
    
      /* floating-point-type */ acosh(/* floating-point-type */ x);
      float acoshf(float x);
      long double acoshl(long double x);
    
      /* floating-point-type */ asinh(/* floating-point-type */ x);
      float asinhf(float x);
      long double asinhl(long double x);
    
      /* floating-point-type */ atanh(/* floating-point-type */ x);
      float atanhf(float x);
      long double atanhl(long double x);
    
      /* floating-point-type */ cosh(/* floating-point-type */ x);
      float coshf(float x);
      long double coshl(long double x);
    
      /* floating-point-type */ sinh(/* floating-point-type */ x);
      float sinhf(float x);
      long double sinhl(long double x);
    
      /* floating-point-type */ tanh(/* floating-point-type */ x);
      float tanhf(float x);
      long double tanhl(long double x);
    
      /* floating-point-type */ exp(/* floating-point-type */ x);
      float expf(float x);
      long double expl(long double x);
    
      /* floating-point-type */ exp2(/* floating-point-type */ x);
      float exp2f(float x);
      long double exp2l(long double x);
    
      /* floating-point-type */ expm1(/* floating-point-type */ x);
      float expm1f(float x);
      long double expm1l(long double x);
    
      constexpr /* floating-point-type */ frexp(/* floating-point-type */ value, int* exp);
      constexpr float frexpf(float value, int* exp);
      constexpr long double frexpl(long double value, int* exp);
    
      constexpr int ilogb(/* floating-point-type */ x);
      constexpr int ilogbf(float x);
      constexpr int ilogbl(long double x);
    
      constexpr /* floating-point-type */ ldexp(/* floating-point-type */ x, int exp);
      constexpr float ldexpf(float x, int exp);
      constexpr long double ldexpl(long double x, int exp);
    
      /* floating-point-type */ log(/* floating-point-type */ x);
      float logf(float x);
      long double logl(long double x);
    
      /* floating-point-type */ log10(/* floating-point-type */ x);
      float log10f(float x);
      long double log10l(long double x);
    
      /* floating-point-type */ log1p(/* floating-point-type */ x);
      float log1pf(float x);
      long double log1pl(long double x);
    
      /* floating-point-type */ log2(/* floating-point-type */ x);
      float log2f(float x);
      long double log2l(long double x);
    
      constexpr /* floating-point-type */ logb(/* floating-point-type */ x);
      constexpr float logbf(float x);
      constexpr long double logbl(long double x);
    
      constexpr /* floating-point-type */ modf(/* floating-point-type */ value,
                                               /* floating-point-type */* iptr);
      constexpr float modff(float value, float* iptr);
      constexpr long double modfl(long double value, long double* iptr);
    
      constexpr /* floating-point-type */ scalbn(/* floating-point-type */ x, int n);
      constexpr float scalbnf(float x, int n);
      constexpr long double scalbnl(long double x, int n);
    
      constexpr /* floating-point-type */ scalbln(/* floating-point-type */ x, long int n);
      constexpr float scalblnf(float x, long int n);
      constexpr long double scalblnl(long double x, long int n);
    
      /* floating-point-type */ cbrt(/* floating-point-type */ x);
      float cbrtf(float x);
      long double cbrtl(long double x);
    
      // valores absolutos
      constexpr int abs(int j);                     // freestanding
      constexpr long int abs(long int j);           // freestanding
      constexpr long long int abs(long long int j); // freestanding
      constexpr /* floating-point-type */
        abs(/* floating-point-type */ j);           // freestanding-deleted
    
      constexpr /* floating-point-type */ fabs(/* floating-point-type */ x);
      constexpr float fabsf(float x);
      constexpr long double fabsl(long double x);
    
      /* floating-point-type */ hypot(/* floating-point-type */ x,
                                      /* floating-point-type */ y);
      float hypotf(float x, float y);
      long double hypotl(long double x, long double y);
    
      // hipotenusa tridimensional
      float hypot(/* floating-point-type */ x,
                  /* floating-point-type */ y,
                  /* floating-point-type */ z);
    
      /* floating-point-type */ pow(/* floating-point-type */ x,
                                    /* floating-point-type */ y);
      float powf(float x, float y);
      long double powl(long double x, long double y);
    
      /* floating-point-type */ sqrt(/* floating-point-type */ x);
      float sqrtf(float x);
      long double sqrtl(long double x);
    
      /* floating-point-type */ erf(/* floating-point-type */ x);
      float erff(float x);
      long double erfl(long double x);
    
      /* floating-point-type */ erfc(/* floating-point-type */ x);
      float erfcf(float x);
      long double erfcl(long double x);
    
      /* floating-point-type */ lgamma(/* floating-point-type */ x);
      float lgammaf(float x);
      long double lgammal(long double x);
    
      /* floating-point-type */ tgamma(/* floating-point-type */ x);
      float tgammaf(float x);
      long double tgammal(long double x);
    
      constexpr /* floating-point-type */ ceil(/* floating-point-type */ x);
      constexpr float ceilf(float x);
      constexpr long double ceill(long double x);
    
      constexpr /* floating-point-type */ floor(/* floating-point-type */ x);
      constexpr float floorf(float x);
      constexpr long double floorl(long double x);
    
      /* floating-point-type */ nearbyint(/* floating-point-type */ x);
      float nearbyintf(float x);
      long double nearbyintl(long double x);
    
      /* floating-point-type */ rint(/* floating-point-type */ x);
      float rintf(float x);
      long double rintl(long double x);
    
      long int lrint(/* floating-point-type */ x);
      long int lrintf(float x);
      long int lrintl(long double x);
    
      long long int llrint(/* floating-point-type */ x);
      long long int llrintf(float x);
      long long int llrintl(long double x);
    
      constexpr /* floating-point-type */ round(/* floating-point-type */ x);
      constexpr float roundf(float x);
      constexpr long double roundl(long double x);
    
      constexpr long int lround(/* floating-point-type */ x);
      constexpr long int lroundf(float x);
      constexpr long int lroundl(long double x);
    
      constexpr long long int llround(/* floating-point-type */ x);
      constexpr long long int llroundf(float x);
      constexpr long long int llroundl(long double x);
    
      constexpr /* floating-point-type */ trunc(/* floating-point-type */ x);
      constexpr float truncf(float x);
      constexpr long double truncl(long double x);
    
      constexpr /* floating-point-type */ fmod(/* floating-point-type */ x,
                                               /* floating-point-type */ y);
      constexpr float fmodf(float x, float y);
      constexpr long double fmodl(long double x, long double y);
    
      constexpr /* floating-point-type */ remainder(/* floating-point-type */ x,
                                                    /* floating-point-type */ y);
      constexpr float remainderf(float x, float y);
      constexpr long double remainderl(long double x, long double y);
    
      constexpr /* floating-point-type */ remquo(/* floating-point-type */ x,
                                                 /* floating-point-type */ y, int* quo);
      constexpr float remquof(float x, float y, int* quo);
      constexpr long double remquol(long double x, long double y, int* quo);
    
      constexpr /* floating-point-type */ copysign(/* floating-point-type */ x,
                                                   /* floating-point-type */ y);
      constexpr float copysignf(float x, float y);
      constexpr long double copysignl(long double x, long double y);
    
      double nan(const char* tagp);
      float nanf(const char* tagp);
      long double nanl(const char* tagp);
    
      constexpr /* floating-point-type */ nextafter(/* floating-point-type */ x,
                                                    /* floating-point-type */ y);
      constexpr float nextafterf(float x, float y);
      constexpr long double nextafterl(long double x, long double y);
    
      constexpr /* floating-point-type */ nexttoward(/* floating-point-type */ x,
                                                     long double y);
      constexpr float nexttowardf(float x, long double y);
      constexpr long double nexttowardl(long double x, long double y);
    
      constexpr /* floating-point-type */ fdim(/* floating-point-type */ x,
                                               /* floating-point-type */ y);
      constexpr float fdimf(float x, float y);
      constexpr long double fdiml(long double x, long double y);
    
      constexpr /* floating-point-type */ fmax(/* floating-point-type */ x,
                                               /* floating-point-type */ y);
      constexpr float fmaxf(float x, float y);
      constexpr long double fmaxl(long double x, long double y);
    
      constexpr /* floating-point-type */ fmin(/* floating-point-type */ x,
                                               /* floating-point-type */ y);
      constexpr float fminf(float x, float y);
      constexpr long double fminl(long double x, long double y);
    
      constexpr /* floating-point-type */ fma(/* floating-point-type */ x,
                                              /* floating-point-type */ y,
                                              /* floating-point-type */ z);
      constexpr float fmaf(float x, float y, float z);
      constexpr long double fmal(long double x, long double y, long double z);
    
      // interpolação linear
      constexpr /* floating-point-type */ lerp(/* floating-point-type */ a,
                                               /* floating-point-type */ b,
                                               /* floating-point-type */ t) noexcept;
    
      // funções de classificação / comparação
      constexpr int fpclassify(/* floating-point-type */ x);
    
      constexpr bool isfinite(/* floating-point-type */ x);
    
      constexpr bool isinf(/* floating-point-type */ x);
    
      constexpr bool isnan(/* floating-point-type */ x);
    
      constexpr bool isnormal(/* floating-point-type */ x);
    
      constexpr bool signbit(/* floating-point-type */ x);
    
      constexpr bool isgreater(/* floating-point-type */ x,
                               /* floating-point-type */ y);
    
      constexpr bool isgreaterequal(/* floating-point-type */ x,
                                    /* floating-point-type */ y);
    
      constexpr bool isless(/* floating-point-type */ x,
                            /* floating-point-type */ y);
    
      constexpr bool islessequal(/* floating-point-type */ x,
                                 /* floating-point-type */ y);
    
      constexpr bool islessgreater(/* floating-point-type */ x,
                                   /* floating-point-type */ y);
    
      constexpr bool isunordered(/* floating-point-type */ x,
                                 /* floating-point-type */ y);
    
      // funções matemáticas especiais
    
      // polinômios de Laguerre associados
      /* floating-point-type */ assoc_laguerre(unsigned n, unsigned m,
                                               /* floating-point-type */ x);
      float assoc_laguerref(unsigned n, unsigned m, float x);
      long double assoc_laguerrel(unsigned n, unsigned m, long double x);
    
      // funções de Legendre associadas
      /* floating-point-type */ assoc_legendre(unsigned l, unsigned m,
                                               /* floating-point-type */ x);
      float assoc_legendref(unsigned l, unsigned m, float x);
```
```cpp
      long double assoc_legendrel(unsigned l, unsigned m, long double x);
     
      // função beta
      /* floating-point-type */ beta(/* floating-point-type */ x,
                                     /* floating-point-type */ y);
      float betaf(float x, float y);
      long double betal(long double x, long double y);
     
      // integral elíptica completa de primeira espécie
      /* floating-point-type */ comp_ellint_1(/* floating-point-type */ k);
      float comp_ellint_1f(float k);
      long double comp_ellint_1l(long double k);
     
      // integral elíptica completa de segunda espécie
      /* floating-point-type */ comp_ellint_2(/* floating-point-type */ k);
      float comp_ellint_2f(float k);
      long double comp_ellint_2l(long double k);
     
      // integral elíptica completa de terceira espécie
      /* floating-point-type */ comp_ellint_3(/* floating-point-type */ k,
                                              /* floating-point-type */ nu);
      float comp_ellint_3f(float k, float nu);
      long double comp_ellint_3l(long double k, long double nu);
     
      // funções de Bessel cilíndricas modificadas regulares
      /* floating-point-type */ cyl_bessel_i(/* floating-point-type */ nu,
                                             /* floating-point-type */ x);
      float cyl_bessel_if(float nu, float x);
      long double cyl_bessel_il(long double nu, long double x);
     
      // funções de Bessel cilíndricas de primeira espécie
      /* floating-point-type */ cyl_bessel_j(/* floating-point-type */ nu,
                                             /* floating-point-type */ x);
      float cyl_bessel_jf(float nu, float x);
      long double cyl_bessel_jl(long double nu, long double x);
     
      // funções de Bessel cilíndricas modificadas irregulares
      /* floating-point-type */ cyl_bessel_k(/* floating-point-type */ nu,
                                             /* floating-point-type */ x);
      float cyl_bessel_kf(float nu, float x);
      long double cyl_bessel_kl(long double nu, long double x);
     
      // funções de Neumann cilíndricas;
      // funções de Bessel cilíndricas de segunda espécie
      /* floating-point-type */ cyl_neumann(/* floating-point-type */ nu,
                                            /* floating-point-type */ x);
      float cyl_neumannf(float nu, float x);
      long double cyl_neumannl(long double nu, long double x);
     
      // integral elíptica incompleta de primeira espécie
      /* floating-point-type */ ellint_1(/* floating-point-type */ k,
                                         /* floating-point-type */ phi);
      float ellint_1f(float k, float phi);
      long double ellint_1l(long double k, long double phi);
     
      // integral elíptica incompleta de segunda espécie
      /* floating-point-type */ ellint_2(/* floating-point-type */ k,
                                         /* floating-point-type */ phi);
      float ellint_2f(float k, float phi);
      long double ellint_2l(long double k, long double phi);
     
      // integral elíptica incompleta de terceira espécie
      /* floating-point-type */ ellint_3(/* floating-point-type */ k,
                                         /* floating-point-type */ nu,
                                         /* floating-point-type */ phi);
      float ellint_3f(float k, float nu, float phi);
      long double ellint_3l(long double k, long double nu, long double phi);
     
      // integral exponencial
      /* floating-point-type */ expint(/* floating-point-type */ x);
      float expintf(float x);
      long double expintl(long double x);
     
      // polinômios de Hermite
      /* floating-point-type */ hermite(unsigned n, /* floating-point-type */ x);
      float hermitef(unsigned n, float x);
      long double hermitel(unsigned n, long double x);
     
      // polinômios de Laguerre
      /* floating-point-type */ laguerre(unsigned n, /* floating-point-type */ x);
      float laguerref(unsigned n, float x);
      long double laguerrel(unsigned n, long double x);
     
      // polinômios de Legendre
      /* floating-point-type */ legendre(unsigned l, /* floating-point-type */ x);
      float legendref(unsigned l, float x);
      long double legendrel(unsigned l, long double x);
     
      // função zeta de Riemann
      /* floating-point-type */ riemann_zeta(/* floating-point-type */ x);
      float riemann_zetaf(float x);
      long double riemann_zetal(long double x);
     
      // funções de Bessel esféricas de primeira espécie
      /* floating-point-type */ sph_bessel(unsigned n, /* floating-point-type */ x);
      float sph_besself(unsigned n, float x);
      long double sph_bessell(unsigned n, long double x);
     
      // funções de Legendre associadas esféricas
      /* floating-point-type */ sph_legendre(unsigned l, unsigned m,
                                             /* floating-point-type */ theta);
      float sph_legendref(unsigned l, unsigned m, float theta);
      long double  sph_legendrel(unsigned l, unsigned m, long double theta);
     
      // funções de Neumann esféricas;
      // funções de Bessel esféricas de segunda espécie
      /* floating-point-type */ sph_neumann(unsigned n, /* floating-point-type */ x);
      float sph_neumannf(unsigned n, float x);
      long double sph_neumannl(unsigned n, long double x);
    }
```