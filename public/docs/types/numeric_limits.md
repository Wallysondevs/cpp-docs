# std::numeric_limits

Definido no header `[<limits>](<#/doc/header/limits>)`

```cpp
template< class T > class numeric_limits;
```

O template de classe `std::numeric_limits` fornece uma maneira padronizada de consultar várias propriedades de tipos aritméticos (por exemplo, o maior valor possível para o tipo int é std::numeric_limits&lt;int&gt;::max()).

Esta informação é fornecida através de especializações do template `std::numeric_limits`. A [standard library](<#/doc/standard_library>) disponibiliza especializações para todos os tipos aritméticos (lista apenas as especializações para tipos aritméticos cv-não qualificados):

Definido no header `[<limits>](<#/doc/header/limits>)`

```cpp
template<> class numeric_limits<bool>;
template<> class numeric_limits<char>;
template<> class numeric_limits<signed char>;
template<> class numeric_limits<unsigned char>;
template<> class numeric_limits<wchar_t>;
template<> class numeric_limits<char8_t>;  // (desde C++20)
template<> class numeric_limits<char16_t>;  // (desde C++11)
template<> class numeric_limits<char32_t>;  // (desde C++11)
template<> class numeric_limits<short>;
template<> class numeric_limits<unsigned short>;
template<> class numeric_limits<int>;
template<> class numeric_limits<unsigned int>;
template<> class numeric_limits<long>;
template<> class numeric_limits<unsigned long>;
template<> class numeric_limits<long long>;  // (desde C++11)
template<> class numeric_limits<unsigned long long>;  // (desde C++11)
template<> class numeric_limits<float>;
template<> class numeric_limits<double>;
template<> class numeric_limits<long double>;
```

O valor de cada membro de uma especialização de `std::numeric_limits` em um tipo cv-qualificado _cv_ `T` é igual ao valor do membro correspondente da especialização no tipo não qualificado `T`. Por exemplo, std::numeric_limits&lt;int&gt;::digits é igual a std::numeric_limits&lt;const int&gt;::digits.

Aliases de tipos aritméticos (como [std::size_t](<#/doc/types/size_t>) ou [std::streamsize](<#/doc/io/streamsize>)) também podem ser examinados com os type traits de `std::numeric_limits`.

Tipos padrão não aritméticos, como [std::complex](<#/doc/numeric/complex>)&lt;T&gt; ou [std::nullptr_t](<#/doc/types/nullptr_t>), não possuem especializações.

Se a implementação definir quaisquer [tipos de classe inteira](<#/doc/iterator/weakly_incrementable>), especializações de `std::numeric_limits` também devem ser fornecidas para eles. | (desde C++20)

Implementações podem fornecer especializações de `std::numeric_limits` para tipos específicos da implementação: por exemplo, o GCC fornece `std::numeric_limits<__int128>`. Bibliotecas não padrão podem [adicionar especializações](<#/doc/language/extending_std>) para tipos fornecidos pela biblioteca, por exemplo, [OpenEXR](<http://openexr.com/>) fornece `std::numeric_limits<half>` para um tipo de ponto flutuante de 16 bits.

### Template parameters

- **T** — um tipo para recuperar propriedades numéricas

### Member constants

[ is_specialized](<#/doc/types/numeric_limits/is_specialized>)[static] | identifica tipos para os quais **std::numeric_limits** é especializado
(constante membro estática pública)
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] | identifica tipos com sinal
(constante membro estática pública)
[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] | identifica tipos inteiros
(constante membro estática pública)
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] | identifica tipos exatos
(constante membro estática pública)
[ has_infinity](<#/doc/types/numeric_limits/has_infinity>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "infinito positivo"
(constante membro estática pública)
[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "quiet not-a-number" (NaN)
(constante membro estática pública)
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "signaling not-a-number" (NaN)
(constante membro estática pública)
[ has_denorm](<#/doc/types/numeric_limits/has_denorm>)[static] | identifica o estilo de desnormalização usado pelo tipo de ponto flutuante
(constante membro estática pública)
[ has_denorm_loss](<#/doc/types/numeric_limits/has_denorm_loss>)[static] | identifica os tipos de ponto flutuante que detectam perda de precisão como perda por desnormalização em vez de resultado inexato
(constante membro estática pública)
[ round_style](<#/doc/types/numeric_limits/round_style>)[static] | identifica o estilo de arredondamento usado pelo tipo
(constante membro estática pública)
[ is_iec559](<#/doc/types/numeric_limits/is_iec559>)[static] | identifica os tipos de ponto flutuante IEC 559/IEEE 754
(constante membro estática pública)
[ is_bounded](<#/doc/types/numeric_limits/is_bounded>)[static] | identifica tipos que representam um conjunto finito de valores
(constante membro estática pública)
[ is_modulo](<#/doc/types/numeric_limits/is_modulo>)[static] | identifica tipos que lidam com overflows usando aritmética modular
(constante membro estática pública)
[ digits](<#/doc/types/numeric_limits/digits>)[static] | número de `radix` dígitos que podem ser representados sem alteração
(constante membro estática pública)
[ digits10](<#/doc/types/numeric_limits/digits10>)[static] | número de dígitos decimais que podem ser representados sem alteração
(constante membro estática pública)
[ max_digits10](<#/doc/types/numeric_limits/max_digits10>)[static] (C++11) | número de dígitos decimais necessários para diferenciar todos os valores deste tipo
(constante membro estática pública)
[ radix](<#/doc/types/numeric_limits/radix>)[static] | a base ou base inteira usada pela representação do tipo dado
(constante membro estática pública)
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] | um a mais que a menor potência negativa da base que é um valor de ponto flutuante normalizado válido
(constante membro estática pública)
[ min_exponent10](<#/doc/types/numeric_limits/min_exponent10>)[static] | a menor potência negativa de dez que é um valor de ponto flutuante normalizado válido
(constante membro estática pública)
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] | um a mais que a maior potência inteira da base que é um valor de ponto flutuante finito válido
(constante membro estática pública)
[ max_exponent10](<#/doc/types/numeric_limits/max_exponent10>)[static] | a maior potência inteira de 10 que é um valor de ponto flutuante finito válido
(constante membro estática pública)
[ traps](<#/doc/types/numeric_limits/traps>)[static] | identifica tipos que podem fazer com que operações aritméticas causem armadilhas (traps)
(constante membro estática pública)
[ tinyness_before](<#/doc/types/numeric_limits/tinyness_before>)[static] | identifica tipos de ponto flutuante que detectam "tinyness" antes do arredondamento
(constante membro estática pública)

### Member functions

[ min](<#/doc/types/numeric_limits/min>)[static] | retorna o menor valor finito do tipo não-ponto-flutuante dado, ou o menor valor normal positivo do tipo de ponto flutuante dado
(função membro estática pública)
[ lowest](<#/doc/types/numeric_limits/lowest>)[static] (C++11) | retorna o menor valor finito do tipo dado, ou seja, o valor mais negativo para tipos com sinal, ​0​ para tipos sem sinal
(função membro estática pública)
[ max](<#/doc/types/numeric_limits/max>)[static] | retorna o maior valor finito do tipo dado
(função membro estática pública)
[ epsilon](<#/doc/types/numeric_limits/epsilon>)[static] | retorna a diferença entre `1.0` e o próximo valor representável do tipo de ponto flutuante dado
(função membro estática pública)
[ round_error](<#/doc/types/numeric_limits/round_error>)[static] | retorna o erro máximo de arredondamento do tipo de ponto flutuante dado
(função membro estática pública)
[ infinity](<#/doc/types/numeric_limits/infinity>)[static] | retorna o valor de infinito positivo do tipo de ponto flutuante dado
(função membro estática pública)
[ quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>)[static] | retorna um valor quiet NaN do tipo de ponto flutuante dado
(função membro estática pública)
[ signaling_NaN](<#/doc/types/numeric_limits/signaling_NaN>)[static] | retorna um valor signaling NaN do tipo de ponto flutuante dado
(função membro estática pública)
[ denorm_min](<#/doc/types/numeric_limits/denorm_min>)[static] | retorna o menor valor subnormal positivo do tipo de ponto flutuante dado
(função membro estática pública)

### Helper classes

[ float_round_style](<#/doc/types/numeric_limits/float_round_style>) | indica modos de arredondamento de ponto flutuante
(enum)
[ float_denorm_style](<#/doc/types/numeric_limits/float_denorm_style>) | indica modos de desnormalização de ponto flutuante
(enum)

### Relationship with C library macro constants

Especialização
`std::numeric_limits<T>`
onde `T` é | Membros
---|---|---|---|---
`min()` | `lowest()`
(C++11) | `max()` | `radix`
bool | false | false | true | 2
char | [CHAR_MIN](<#/doc/types/climits>) | [CHAR_MIN](<#/doc/types/climits>) | [CHAR_MAX](<#/doc/types/climits>) | 2
signed char | [SCHAR_MIN](<#/doc/types/climits>) | [SCHAR_MIN](<#/doc/types/climits>) | [SCHAR_MAX](<#/doc/types/climits>) | 2
unsigned char | ​0​ | ​0​ | [UCHAR_MAX](<#/doc/types/climits>) | 2
wchar_t | [WCHAR_MIN](<#/doc/types/climits>) | [WCHAR_MIN](<#/doc/types/climits>) | [WCHAR_MAX](<#/doc/types/climits>) | 2
char8_t | ​0​ | ​0​ | [UCHAR_MAX](<#/doc/types/climits>) | 2
char16_t | ​0​ | ​0​ | [UINT_LEAST16_MAX](<#/doc/types/integer>) | 2
char32_t | ​0​ | ​0​ | [UINT_LEAST32_MAX](<#/doc/types/integer>) | 2
short | [SHRT_MIN](<#/doc/types/climits>) | [SHRT_MIN](<#/doc/types/climits>) | [SHRT_MAX](<#/doc/types/climits>) | 2
signed short
unsigned short | ​0​ | ​0​ | [USHRT_MAX](<#/doc/types/climits>) | 2
---|---|---|---|---
int | [INT_MIN](<#/doc/types/climits>) | [INT_MIN](<#/doc/types/climits>) | [INT_MAX](<#/doc/types/climits>) | 2
signed int
unsigned int | ​0​ | ​0​ | [UINT_MAX](<#/doc/types/climits>) | 2
---|---|---|---|---
long | [LONG_MIN](<#/doc/types/climits>) | [LONG_MIN](<#/doc/types/climits>) | [LONG_MAX](<#/doc/types/climits>) | 2
signed long
unsigned long | ​0​ | ​0​ | [ULONG_MAX](<#/doc/types/climits>) | 2
---|---|---|---|---
long long | [LLONG_MIN](<#/doc/types/climits>) | [LLONG_MIN](<#/doc/types/climits>) | [LLONG_MAX](<#/doc/types/climits>) | 2
signed long long
unsigned long long | ​0​ | ​0​ | [ULLONG_MAX](<#/doc/types/climits>) | 2
Especialização
`std::numeric_limits<T>`
onde `T` é | Membros `denorm_min()` | `min()` | `lowest()` (C++11) | `max()` | `epsilon()` | `digits` | `digits10` float | [FLT_TRUE_MIN](<#/doc/types/climits>) | [FLT_MIN](<#/doc/types/climits>) | -[FLT_MAX](<#/doc/types/climits>) | [FLT_MAX](<#/doc/types/climits>) | [FLT_EPSILON](<#/doc/types/climits>) | [FLT_MANT_DIG](<#/doc/types/climits>) | [FLT_DIG](<#/doc/types/climits>)
---|---|---|---|---|---|---|---
double | [DBL_TRUE_MIN](<#/doc/types/climits>) | [DBL_MIN](<#/doc/types/climits>) | -[DBL_MAX](<#/doc/types/climits>) | [DBL_MAX](<#/doc/types/climits>) | [DBL_EPSILON](<#/doc/types/climits>) | [DBL_MANT_DIG](<#/doc/types/climits>) | [DBL_DIG](<#/doc/types/climits>)
long double | [LDBL_TRUE_MIN](<#/doc/types/climits>) | [LDBL_MIN](<#/doc/types/climits>) | -[LDBL_MAX](<#/doc/types/climits>) | [LDBL_MAX](<#/doc/types/climits>) | [LDBL_EPSILON](<#/doc/types/climits>) | [LDBL_MANT_DIG](<#/doc/types/climits>) | [LDBL_DIG](<#/doc/types/climits>)
Especialização
`std::numeric_limits<T>`
onde `T` é | Membros (continuação)
---|---|---|---|---|---
`min_exponent` | `min_exponent10` | `max_exponent` | `max_exponent10` | `radix`
float | [FLT_MIN_EXP](<#/doc/types/climits>) | [FLT_MIN_10_EXP](<#/doc/types/climits>) | [FLT_MAX_EXP](<#/doc/types/climits>) | [FLT_MAX_10_EXP](<#/doc/types/climits>) | [FLT_RADIX](<#/doc/types/climits>)
double | [DBL_MIN_EXP](<#/doc/types/climits>) | [DBL_MIN_10_EXP](<#/doc/types/climits>) | [DBL_MAX_EXP](<#/doc/types/climits>) | [DBL_MAX_10_EXP](<#/doc/types/climits>) | [FLT_RADIX](<#/doc/types/climits>)
long double | [LDBL_MIN_EXP](<#/doc/types/climits>) | [LDBL_MIN_10_EXP](<#/doc/types/climits>) | [LDBL_MAX_EXP](<#/doc/types/climits>) | [LDBL_MAX_10_EXP](<#/doc/types/climits>) | [FLT_RADIX](<#/doc/types/climits>)

### Example

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    
    int main() 
    {
        std::cout << "type\t│ lowest()\t│ min()\t\t│ max()\n"
                  << "bool\t│ "
                  << std::numeric_limits<bool>::lowest() << "\t\t│ "
                  << std::numeric_limits<bool>::min() << "\t\t│ "
                  << std::numeric_limits<bool>::max() << '\n'
                  << "uchar\t│ "
                  << +std::numeric_limits<unsigned char>::lowest() << "\t\t│ "
                  << +std::numeric_limits<unsigned char>::min() << "\t\t│ "
                  << +std::numeric_limits<unsigned char>::max() << '\n'
                  << "int\t│ "
                  << std::numeric_limits<int>::lowest() << "\t│ "
                  << std::numeric_limits<int>::min() << "\t│ "
                  << std::numeric_limits<int>::max() << '\n'
                  << "float\t│ "
                  << std::numeric_limits<float>::lowest() << "\t│ "
                  << std::numeric_limits<float>::min() << "\t│ "
                  << std::numeric_limits<float>::max() << '\n'
                  << "double\t│ "
                  << std::numeric_limits<double>::lowest() << "\t│ "
                  << std::numeric_limits<double>::min() << "\t│ "
                  << std::numeric_limits<double>::max() << '\n';
    }
```

Saída possível:
```
    type	│ lowest()	│ min()		│ max()
    bool	│ 0		│ 0		│ 1
    uchar	│ 0		│ 0		│ 255
    int	│ -2147483648	│ -2147483648	│ 2147483647
    float	│ -3.40282e+38	│ 1.17549e-38	│ 3.40282e+38
    double	│ -1.79769e+308	│ 2.22507e-308	│ 1.79769e+308
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 201](<https://cplusplus.github.io/LWG/issue201>) | C++98 | especializações para todos os tipos fundamentais precisam ser fornecidas | tipos não aritméticos excluídos
[LWG 559](<https://cplusplus.github.io/LWG/issue559>) | C++98 | não estava claro se a especialização de `std::numeric_limits` para um tipo cv-qualificado se comporta da mesma forma que a especialização correspondente para o tipo cv-não qualificado | eles têm o mesmo comportamento

### See also

  * [Tipos inteiros de largura fixa](<#/doc/types/integer>)
  * [Tipos aritméticos](<#/doc/language/types>)
  * [Visão geral do sistema de tipos C++](<#/doc/language/type-id>)
  * [Suporte a tipos (tipos básicos, RTTI, type traits)](<#/doc/types>)
  * [Interface de limites numéricos C](<#/doc/types/climits>)
