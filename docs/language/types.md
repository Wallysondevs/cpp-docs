# Tipos fundamentais

(Veja também [tipo](<#/doc/language/type-id>) para uma visão geral do sistema de tipos e [a lista de utilitários relacionados a tipos](<#/doc/types>) fornecidos pela biblioteca C++)  
  
Os seguintes tipos são coletivamente chamados de _tipos fundamentais_ :

*   (possivelmente cv-qualificado) void
*   (possivelmente cv-qualificado) [std::nullptr_t](<#/doc/types/nullptr_t>)

| (desde C++11)  
  
*   [tipos integrais](<#/doc/language/types>)
*   [tipos de ponto flutuante](<#/doc/language/types>)

### void

    void — tipo com um conjunto vazio de valores. É um [tipo incompleto](<#/doc/language/incomplete_type>) que não pode ser completado (consequentemente, objetos do tipo void não são permitidos). Não existem [arrays](<#/doc/language/array>) de void, nem [referências](<#/doc/language/reference>) a void. No entanto, [ponteiros para void](<#/doc/language/pointer>) e [funções](<#/doc/language/function>) que retornam o tipo void (_procedimentos_ em outras linguagens) são permitidos.

### [std::nullptr_t](<#/doc/types/nullptr_t>)

```cpp
| Definido no cabeçalho `<cstddef>`
typedef decltype(nullptr) nullptr_t;  // (desde C++11)
```

  
[std::nullptr_t](<#/doc/types/nullptr_t>) é o tipo do literal de ponteiro nulo, [`nullptr`](<#/doc/language/nullptr>). É um tipo distinto que não é um tipo de ponteiro ou um tipo de ponteiro para membro. Todos os seus prvalues são [constantes de ponteiro nulo](<#/doc/language/pointer>).

sizeof([std::nullptr_t](<#/doc/types/nullptr_t>)) é igual a sizeof(void*).

(desde C++11)  
  
### Tipos integrais

#### Tipos inteiros padrão

    int — tipo inteiro básico. A palavra-chave int pode ser omitida se qualquer um dos modificadores listados abaixo for usado. Se nenhum modificador de comprimento estiver presente, é garantido que tenha uma largura de pelo menos 16 bits. No entanto, em sistemas de 32/64 bits, é quase exclusivamente garantido que tenha uma largura de pelo menos 32 bits (veja abaixo).

##### Modificadores

Modifica o tipo inteiro básico. Podem ser misturados em qualquer ordem. Apenas um de cada grupo pode estar presente no nome do tipo.

*   Sinalização:

    signed — o tipo alvo terá representação com sinal (este é o padrão se omitido)
    unsigned — o tipo alvo terá representação sem sinal

*   Tamanho:

    short — o tipo alvo será otimizado para espaço e terá uma largura de pelo menos 16 bits.
    long — o tipo alvo terá uma largura de pelo menos 32 bits.

    long long — o tipo alvo terá uma largura de pelo menos 64 bits.
| (desde C++11)  
  
Nota: assim como em todos os especificadores de tipo, qualquer ordem é permitida: unsigned long long int e long int unsigned long nomeiam o mesmo tipo.

##### Propriedades

A tabela a seguir resume todos os tipos inteiros padrão disponíveis e suas propriedades em vários modelos de dados comuns:

Especificador de tipo | Tipo equivalente | Largura em bits por [modelo de dados](<#/doc/language/types>)  
Padrão C++ | LP32 | ILP32 | LLP64 | LP64   
signed char | signed char | pelo menos  
**8** | **8** | **8** | **8** | **8**  
unsigned char | unsigned char  
short | short int | pelo menos  
**16** | **16** | **16** | **16** | **16**  
short int  
signed short  
signed short int  
unsigned short | unsigned short int  
unsigned short int  
int | int | pelo menos  
**16** | **16** | **32** | **32** | **32**  
signed  
signed int  
unsigned | unsigned int  
unsigned int  
long | long int | pelo menos  
**32** | **32** | **32** | **32** | **64**  
long int  
signed long  
signed long int  
unsigned long | unsigned long int  
unsigned long int  
long long | long long int  
---|---
(C++11) | pelo menos  
**64** | **64** | **64** | **64** | **64**  
long long int  
signed long long  
signed long long int  
unsigned long long | unsigned long long int  
(C++11)  
unsigned long long int  
  
Nota: a aritmética de inteiros é definida de forma diferente para os tipos inteiros com e sem sinal. Veja [operadores aritméticos](<#/doc/language/operator_arithmetic>), em particular [overflows de inteiros](<#/doc/language/operator_arithmetic>).

[std::size_t](<#/doc/types/size_t>) é o tipo inteiro sem sinal do resultado do operador [`sizeof`](<#/doc/language/sizeof>), bem como do operador [`sizeof...`](<#/doc/language/sizeof...>) e do operador [`alignof`](<#/doc/language/alignof>) (desde C++11).

#### Tipos inteiros estendidos

Os tipos inteiros estendidos são definidos pela implementação. Note que os [tipos inteiros de largura fixa](<#/doc/types/integer>) são tipicamente aliases dos tipos inteiros padrão. | (desde C++11)  
  
#### Tipo booleano

    bool — tipo inteiro, capaz de armazenar um dos dois valores: [`true`](<#/doc/language/bool_literal>) ou [`false`](<#/doc/language/bool_literal>). O valor de sizeof(bool) é definido pela implementação e pode ser diferente de 1.

#### Tipos de caractere

Tipos de caractere são tipos inteiros usados para representação de caracteres.

    signed char — tipo para representação de caractere com sinal.
    unsigned char — tipo para representação de caractere sem sinal. Também usado para inspecionar [representações de objeto](<#/doc/language/objects>) (memória bruta).
    char — tipo para representação de caractere que pode ser processado de forma mais eficiente no sistema alvo (tem a mesma representação e alinhamento que signed char ou unsigned char, mas é sempre um tipo distinto). [Strings de caracteres multibyte](<#/doc/string/multibyte>) usam este tipo para representar unidades de código. Para cada valor do tipo unsigned char no intervalo `[`​0​`, `255`]`, converter o valor para char e depois de volta para unsigned char produz o valor original. (desde C++11) O sinal de char depende do compilador e da plataforma alvo: os padrões para ARM e PowerPC são tipicamente sem sinal, os padrões para x86 e x64 são tipicamente com sinal.
    wchar_t — tipo para representação de caractere largo (veja [strings largas](<#/doc/string/wide>)). Tem o mesmo tamanho, sinalização e alinhamento que um dos tipos inteiros, mas é um tipo distinto. Na prática, tem 32 bits e armazena UTF-32 no Linux e em muitos outros sistemas não-Windows, mas 16 bits e armazena unidades de código UTF-16 no Windows. O padrão costumava exigir que wchar_t fosse grande o suficiente para representar qualquer ponto de código de caractere suportado. No entanto, tal requisito não pode ser cumprido no Windows, e, portanto, é considerado um [defeito](<#/doc/language/types>) e foi removido.

    char16_t — tipo para representação de caractere UTF-16, exigido para ser grande o suficiente para representar qualquer unidade de código UTF-16 (16 bits). Tem o mesmo tamanho, sinalização e alinhamento que [std::uint_least16_t](<#/doc/types/integer>), mas é um tipo distinto.

    char32_t — tipo para representação de caractere UTF-32, exigido para ser grande o suficiente para representar qualquer unidade de código UTF-32 (32 bits). Tem o mesmo tamanho, sinalização e alinhamento que [std::uint_least32_t](<#/doc/types/integer>), mas é um tipo distinto.
| (desde C++11)  
  
    char8_t — tipo para representação de caractere UTF-8, exigido para ser grande o suficiente para representar qualquer unidade de código UTF-8 (8 bits). Tem o mesmo tamanho, sinalização e alinhamento que unsigned char (e, portanto, o mesmo tamanho e alinhamento que char e signed char), mas é um tipo distinto.
| (desde C++20)  
  
Além das contagens mínimas de bits, o Padrão C++ garante que

    1 == sizeof(char) `≤` sizeof(short) `≤` sizeof(int) `≤` sizeof(long) `≤` sizeof(long long).

Nota: isso permite o caso extremo em que [bytes](<https://en.wikipedia.org/wiki/Byte> "enwiki:Byte") têm 64 bits, todos os tipos (incluindo char) têm 64 bits de largura, e [`sizeof`](<#/doc/language/sizeof>) retorna 1 para cada tipo.

### Tipos de ponto flutuante

#### Tipos de ponto flutuante padrão

Os três tipos a seguir e suas versões cv-qualificadas são coletivamente chamados de tipos de ponto flutuante padrão.

    float — tipo de ponto flutuante de precisão simples. Geralmente [formato IEEE-754 binary32](<https://en.wikipedia.org/wiki/Single-precision_floating-point_format> "enwiki:Single-precision floating-point format").
    double — tipo de ponto flutuante de precisão dupla. Geralmente [formato IEEE-754 binary64](<https://en.wikipedia.org/wiki/Double-precision_floating-point_format> "enwiki:Double-precision floating-point format").
    long double — tipo de ponto flutuante de precisão estendida. Não mapeia necessariamente para tipos exigidos pelo IEEE-754.

*   [Formato IEEE-754 binary128](<https://en.wikipedia.org/wiki/Quadruple-precision_floating-point_format> "enwiki:Quadruple-precision floating-point format") é usado por algumas implementações HP-UX, SPARC, MIPS, ARM64 e z/OS.
*   O [formato estendido IEEE-754 binary64](<https://en.wikipedia.org/wiki/Extended_precision> "enwiki:Extended precision") mais conhecido é o [formato de precisão estendida x87 de 80 bits](<https://en.wikipedia.org/wiki/Extended_precision#x86_extended_precision_format> "enwiki:Extended precision"). É usado por muitas implementações x86 e x86-64 (uma exceção notável é o MSVC, que implementa long double no mesmo formato que double, ou seja, binary64).
*   Em PowerPC, [double-double](<https://en.wikipedia.org/wiki/Quadruple-precision_floating-point_format#Double-double_arithmetic> "enwiki:Quadruple-precision floating-point format") pode ser usado.

#### Tipos de ponto flutuante estendidos

Os tipos de ponto flutuante estendidos são definidos pela implementação. Eles podem incluir [tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>). | (desde C++23)  
  
#### Propriedades

Tipos de ponto flutuante podem suportar [valores especiais](<#/doc/types/numeric_limits>):

*   _infinito_ (positivo e negativo), veja [INFINITY](<#/doc/numeric/math/INFINITY>)
*   o _zero negativo_ , -0.0. Ele se compara como igual ao zero positivo, mas é significativo em algumas operações aritméticas, por exemplo, 1.0 / 0.0 == [INFINITY](<#/doc/numeric/math/INFINITY>), mas 1.0 / -0.0 == -[INFINITY](<#/doc/numeric/math/INFINITY>)), e para algumas funções matemáticas, por exemplo, [`sqrt(std::complex)`](<#/doc/numeric/complex/sqrt>)
*   _não-é-um-número_ (NaN), que não se compara como igual a nada (incluindo a si mesmo). Múltiplos padrões de bits representam NaNs, veja [std::nan](<#/doc/numeric/math/nan.2>), [NAN](<#/doc/numeric/math/NAN>). Note que C++ não faz distinção especial de NaNs sinalizadores além de detectar seu suporte por [std::numeric_limits::has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>), e trata todos os NaNs como silenciosos.

Números de ponto flutuante podem ser usados com [operadores aritméticos](<#/doc/language/operator_arithmetic>) +, -, /, e * bem como várias funções matemáticas de [`<cmath>`](<#/doc/header/cmath>). Tanto os operadores embutidos quanto as funções de biblioteca podem levantar exceções de ponto flutuante e definir [errno](<#/doc/error/errno>) conforme descrito em [`math errhandling`](<#/doc/numeric/math/math_errhandling>).

Expressões de ponto flutuante podem ter maior intervalo e precisão do que o indicado por seus tipos, veja [FLT_EVAL_METHOD](<#/doc/types/climits/FLT_EVAL_METHOD>). Expressões de ponto flutuante também podem ser _contraídas_ , ou seja, calculadas como se todos os valores intermediários tivessem intervalo e precisão infinitos, veja [` #pragma STDC FP_CONTRACT`](<#/doc/preprocessor/impl>). O C++ padrão não restringe a precisão das operações de ponto flutuante.

Algumas operações em números de ponto flutuante são afetadas e modificam o estado do [ambiente de ponto flutuante](<#/doc/numeric/fenv>) (mais notavelmente, a direção de arredondamento).

[Conversões implícitas](<#/doc/language/implicit_cast>) são definidas entre tipos flutuantes e tipos inteiros.

Veja [limites de tipos de ponto flutuante](<#/doc/types/climits>) e [std::numeric_limits](<#/doc/types/numeric_limits>) para detalhes adicionais, limites e propriedades dos tipos de ponto flutuante.

### Intervalo de valores

A tabela a seguir fornece uma referência para os limites das representações numéricas comuns.

Antes do C++20, o Padrão C++ permitia qualquer representação de inteiro com sinal, e o intervalo mínimo garantido de inteiros com sinal de N bits era de \\(\scriptsize -(2^{N-1}-1)\\)-(2N-1  
-1) a \\(\scriptsize +2^{N-1}-1\\)+2N-1  
-1 (por exemplo, **−127** a **127** para um tipo de 8 bits com sinal), o que corresponde aos limites do [complemento de um](<https://en.wikipedia.org/wiki/Ones%27_complement> "enwiki:Ones' complement") ou [sinal e magnitude](<https://en.wikipedia.org/wiki/Signed_number_representations#Sign-and-magnitude_method> "enwiki:Signed number representations").

No entanto, todos os compiladores C++ usam a representação de [complemento de dois](<https://en.wikipedia.org/wiki/Two%27s_complement> "enwiki:Two's complement"), e a partir do C++20, é a única representação permitida pelo padrão, com o intervalo garantido de \\(\scriptsize -2^{N-1}\\)-2N-1  
a \\(\scriptsize +2^{N-1}-1\\)+2N-1  
-1 (por exemplo, **−128** a **127** para um tipo de 8 bits com sinal).

Representações de complemento de um e sinal e magnitude de 8 bits para char foram desautorizadas desde C++11 (através da resolução do [problema CWG 1759](<https://cplusplus.github.io/CWG/issues/1759.html>)), porque uma unidade de código UTF-8 com valor 0x80 usada em um [literal de string UTF-8](<#/doc/language/string_literal>) deve ser armazenável em um objeto do tipo char.

O intervalo para um tipo de ponto flutuante `T` é definido da seguinte forma:

*   O intervalo mínimo garantido é o número de ponto flutuante finito mais negativo representável em `T` até o número de ponto flutuante finito mais positivo representável em `T`.
*   Se o infinito negativo for representável em `T`, o intervalo de `T` é estendido para todos os números reais negativos.
*   Se o infinito positivo for representável em `T`, o intervalo de `T` é estendido para todos os números reais positivos.

Como o infinito negativo e positivo são representáveis nos formatos [ISO/IEC/IEEE 60559](<https://www.iso.org/standard/80985.html>), todos os números reais estão dentro do intervalo de valores representáveis de um tipo de ponto flutuante que adere ao ISO/IEC/IEEE 60559.

Tipo | Tamanho em bits | Formato | Intervalo de valores   
Aproximado | Exato   
caractere | 8 | com sinal | | **−128** a **127**  
sem sinal | | **0** a **255**  
16 | UTF-16 | | **0** a **65535**  
32 | UTF-32 | | **0** a **1114111** (**0x10ffff**)   
inteiro | 16 | com sinal | **± 3.27 · 10 4** | **−32768** a **32767**  
sem sinal | **0** a **6.55 · 10 4** | **0** a **65535**  
32 | com sinal | **± 2.14 · 10 9** | **−2,147,483,648** a **2,147,483,647**  
sem sinal | **0** a **4.29 · 10 9** | **0** a **4,294,967,295**  
64 | com sinal | **± 9.22 · 10 18** | **−9,223,372,036,854,775,808** a **9,223,372,036,854,775,807**  
sem sinal | **0** a **1.84 · 10 19** | **0** a **18,446,744,073,709,551,615**  
ponto  
flutuante  
binário | 32 | [IEEE-754](<https://en.wikipedia.org/wiki/Single-precision_floating-point_format> "enwiki:Single-precision floating-point format") | 

  * min subnormal:  
**± 1.401,298,4 · 10 −45**
  * min normal:  
**± 1.175,494,3 · 10 −38**
  * max:  
**± 3.402,823,4 · 10 38**

| 

  * min subnormal:  
**±0x1p−149**
  * min normal:  
**±0x1p−126**
  * max:  
**±0x1.fffffep+127**

  
64 | [IEEE-754](<https://en.wikipedia.org/wiki/Double-precision_floating-point_format> "enwiki:Double-precision floating-point format") | 

  * min subnormal:  
**± 4.940,656,458,412 · 10 −324**
  * min normal:  
**± 2.225,073,858,507,201,4 · 10 −﻿308**
  * max:  
**± 1.797,693,134,862,315,7 · 10 308**

| 

  * min subnormal:  
**±0x1p−1074**
  * min normal:  
**±0x1p−1022**
  * max:  
**±0x1.fffffffffffffp+1023**

  
80[note 1](<#/doc/language/types>) | [x86](<https://en.wikipedia.org/wiki/Extended_precision> "enwiki:Extended precision") | 

  * min subnormal:  
**± 3.645,199,531,882,474,602,528  
· 10−4951**
  * min normal:  
**± 3.362,103,143,112,093,506,263  
· 10−4932**
  * max:  
**± 1.189,731,495,357,231,765,021  
· 104932**

| 

  * min subnormal:  
**±0x1p−16445**
  * min normal:  
**±0x1p−16382**
  * max:  
**±0x1.fffffffffffffffep+16383**

  
128 | [IEEE-754](<https://en.wikipedia.org/wiki/Quadruple-precision_floating-point_format> "enwiki:Quadruple-precision floating-point format") | 

  * min subnormal:  
**± 6.475,175,119,438,025,110,924,  
438,958,227,646,552,5 · 10−4966**
  * min normal:  
**± 3.362,103,143,112,093,506,262,  
677,817,321,752,602,6 · 10−4932**
  * max:  
**± 1.189,731,495,357,231,765,085,  
759,326,628,007,016,2 · 104932**

| 

  * min subnormal:  
**±0x1p−16494**
  * min normal:  
**±0x1p−16382**
  * max:  
**±0x1.ffffffffffffffffffffffffffff  
p+16383**

  
  
  1. [↑](<#/doc/language/types>) A representação do objeto geralmente ocupa 96/128 bits em plataformas de 32/64 bits, respectivamente.

Nota: os limites reais (em oposição aos mínimos garantidos) para os valores representáveis por esses tipos estão disponíveis na [interface de limites numéricos C](<#/doc/types/climits>) e em [std::numeric_limits](<#/doc/types/numeric_limits>).

### Modelos de dados

As escolhas feitas por cada implementação sobre os tamanhos dos tipos fundamentais são coletivamente conhecidas como _modelo de dados_. Quatro modelos de dados encontraram ampla aceitação:

Sistemas de 32 bits:

    

  * **LP32** ou **2/4/4** (int tem 16 bits, long e ponteiro têm 32 bits) 

    

  * API Win16 

  * **ILP32** ou **4/4/4** (int, long e ponteiro têm 32 bits); 

    

  * API Win32 
  * Sistemas Unix e semelhantes a Unix (Linux, macOS) 

Sistemas de 64 bits:

    

  * **LLP64** ou **4/4/8** (int e long têm 32 bits, ponteiro tem 64 bits) 

    

  * [API Win32](<https://learn.microsoft.com/en-us/windows/win32/desktop-programming>) (também chamada de Windows API) com alvo de compilação [ARM de 64 bits](<https://en.wikipedia.org/wiki/AArch64> "enwiki:AArch64") (AArch64) ou [x86-64](<https://en.wikipedia.org/wiki/x86-64> "enwiki:x86-64") (também conhecido como x64) 

  * **LP64** ou **4/8/8** (int tem 32 bits, long e ponteiro têm 64 bits) 

    

  * Sistemas Unix e semelhantes a Unix (Linux, macOS) 

Outros modelos são muito raros. Por exemplo, **ILP64** (**8/8/8** : int, long e ponteiro têm 64 bits) apareceu apenas em alguns sistemas Unix de 64 bits iniciais (por exemplo, [UNICOS no Cray](<https://en.wikipedia.org/wiki/UNICOS> "enwiki:UNICOS")).

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_unicode_characters`](<#/doc/feature_test>) | [`200704L`](<#/>) | (C++11) | Novos tipos de caractere (char16_t e char32_t)   
[`__cpp_char8_t`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | char8_t  
[`202207L`](<#/>) | (C++23) | Correção de compatibilidade e portabilidade de char8_t ([permite a inicialização de arrays de `(unsigned) char`](<#/doc/language/aggregate_initialization>) a partir de [literais de string UTF-8](<#/doc/language/string_literal>))   
  
### Palavras-chave

[`void`](<#/doc/keyword/void>), [`bool`](<#/doc/keyword/bool>), [`true`](<#/doc/keyword/true>), [`false`](<#/doc/keyword/false>), [`char`](<#/doc/keyword/char>), [`char8_t`](<#/doc/keyword/char8_t>), [`char16_t`](<#/doc/keyword/char16_t>), [`char32_t`](<#/doc/keyword/char32_t>), [`wchar_t`](<#/doc/keyword/wchar_t>), [`int`](<#/doc/keyword/int>), [`short`](<#/doc/keyword/short>), [`long`](<#/doc/keyword/long>), [`signed`](<#/doc/keyword/signed>), [`unsigned`](<#/doc/keyword/unsigned>), [`float`](<#/doc/keyword/float>), [`double`](<#/doc/keyword/double>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto   
---|---|---|---
[CWG 238](<https://cplusplus.github.io/CWG/issues/238.html>) | C++98 | as restrições impostas a uma implementação de ponto flutuante não eram especificadas | especificado como  
sem restrição   
[CWG 1759](<https://cplusplus.github.io/CWG/issues/1759.html>) | C++11 | char não é garantido ser capaz de representar a unidade de código UTF-8 0x80 | garantido   
---|---|---|---
[CWG 2689](<https://cplusplus.github.io/CWG/issues/2689.html>) | C++11 | [std::nullptr_t](<#/doc/types/nullptr_t>) cv-qualificado não era um tipo fundamental | é   
[CWG 2723](<https://cplusplus.github.io/CWG/issues/2723.html>) | C++98 | os intervalos de valores representáveis para tipos de ponto flutuante não eram especificados | especificado   
[P2460R2](<https://wg21.link/P2460R2>) | C++98 | wchar_t era exigido para ser capaz de representar códigos distintos para todos os membros  
do maior conjunto de caracteres estendido especificado entre as localidades suportadas | não exigido   
  
### Referências

*   Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 6.8.2 Fundamental types [basic.fundamental] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 6.8.1 Fundamental types [basic.fundamental] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 6.9.1 Fundamental types [basic.fundamental] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 3.9.1 Fundamental types [basic.fundamental] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 3.9.1 Fundamental types [basic.fundamental] 

  * Padrão C++03 (ISO/IEC 14882:2003): 

    

  * 3.9.1 Fundamental types [basic.fundamental] 

  * Padrão C++98 (ISO/IEC 14882:1998): 

    

  * 3.9.1 Fundamental types [basic.fundamental] 

### Veja também

*   [Visão geral do sistema de tipos C++](<#/doc/language/type-id>)
*   [Especificadores e qualificadores de const-volatilidade (cv)](<#/doc/language/cv>)
*   [Especificadores de duração de armazenamento](<#/doc/language/storage_duration>)

[Documentação C](<#/>) para tipos aritméticos  
---