# Literais definidos pelo usuário (desde C++11)

Permite que literais inteiros, de ponto flutuante, de caractere e de string produzam objetos de tipo definido pelo usuário, definindo um sufixo definido pelo usuário.

### Sintaxe

Um literal definido pelo usuário é uma expressão de qualquer uma das seguintes formas

---
decimal-literal ud-suffix | (1) |
---|---|---
octal-literal ud-suffix | (2) |
hex-literal ud-suffix | (3) |
binary-literal ud-suffix | (4) |
fractional-constant exponent-part ﻿(optional) ud-suffix | (5) |
digit-sequence exponent-part ud-suffix | (6) |
character-literal ud-suffix | (7) |
string-literal ud-suffix | (8) |

1-4) literais inteiros definidos pelo usuário, como 12_km

5-6) literais de ponto flutuante definidos pelo usuário, como 0.5_Pa

7) literal de caractere definido pelo usuário, como 'c'_X

8) literal de string definido pelo usuário, como "abd"_L ou u"xyz"_M

- **decimal-literal** — o mesmo que em [literal inteiro](<#/doc/language/integer_literal>), um dígito decimal não-zero seguido por zero ou mais dígitos decimais
- **octal-literal** — o mesmo que em [literal inteiro](<#/doc/language/integer_literal>), um zero seguido por zero ou mais dígitos octais
- **hex-literal** — o mesmo que em [literal inteiro](<#/doc/language/integer_literal>), `0x` ou `0X` seguido por um ou mais dígitos hexadecimais
- **binary-literal** — o mesmo que em [literal inteiro](<#/doc/language/integer_literal>), `0b` ou `0B` seguido por um ou mais dígitos binários
- **digit-sequence** — o mesmo que em [literal de ponto flutuante](<#/doc/language/floating_literal>), uma sequência de dígitos decimais
- **fractional-constant** — o mesmo que em [literal de ponto flutuante](<#/doc/language/floating_literal>), ou uma sequência de dígitos seguida por um ponto (123.) ou uma sequência de dígitos opcional seguida por um ponto e outra sequência de dígitos (1.0 ou .12)
- **exponent-part** — o mesmo que em [literal de ponto flutuante](<#/doc/language/floating_literal>), a letra `e` ou a letra `E` seguida por um sinal opcional, seguido por uma sequência de dígitos
- **character-literal** — o mesmo que em [literal de caractere](<#/doc/language/character_literal>)
- **string-literal** — o mesmo que em [literal de string](<#/doc/language/string_literal>), incluindo raw string literals
- **ud-suffix** — um identificador, introduzido por uma declaração de _literal operator_ ou _literal operator template_ (veja [abaixo](<#/doc/language/user_literal>))
Nas sequências de dígitos [inteiros](<#/doc/language/integer_literal>) e de [ponto flutuante](<#/doc/language/floating_literal>), separadores opcionais `'` são permitidos entre quaisquer dois dígitos. | (desde C++14)

Se um token corresponde a uma sintaxe de literal definido pelo usuário e a uma sintaxe de literal regular, ele é assumido como um literal regular (ou seja, é impossível sobrecarregar `LL` em 123LL).

Quando o compilador encontra um literal definido pelo usuário com o sufixo ud `X`, ele realiza uma [busca de nome não qualificada](<#/doc/language/lookup>), procurando por uma função com o nome operator""X. Se a busca não encontrar uma declaração, o programa é malformado. Caso contrário,

1) Para literais inteiros definidos pelo usuário,

a) se o conjunto de sobrecarga incluir um literal operator com o tipo de parâmetro unsigned long long, a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X(n ﻿ULL), onde n é o literal sem o sufixo ud;

b) caso contrário, o conjunto de sobrecarga deve incluir um, mas não ambos, um raw literal operator ou um numeric literal operator template. Se o conjunto de sobrecarga incluir um raw literal operator, a expressão literal definida pelo usuário é tratada como uma chamada de função operator""X("n ﻿");

c) caso contrário, se o conjunto de sobrecarga incluir um numeric literal operator template, a expressão literal definida pelo usuário é tratada como uma chamada de função operator""X<'c1 ﻿', 'c2 ﻿', 'c3 ﻿'..., 'ck ﻿'>(), onde c1..ck são os caracteres individuais de n e todos eles são do [conjunto de caracteres básico](<#/doc/language/charset>).

2) Para literais de ponto flutuante definidos pelo usuário,

a) Se o conjunto de sobrecarga incluir um literal operator com o tipo de parâmetro long double, a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X(f ﻿ ﻿L), onde f é o literal sem o sufixo ud;

b) caso contrário, o conjunto de sobrecarga deve incluir um, mas não ambos, um raw literal operator ou um numeric literal operator template. Se o conjunto de sobrecarga incluir um raw literal operator, a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X("f ﻿ ﻿");

c) caso contrário, se o conjunto de sobrecarga incluir um numeric literal operator template, a expressão literal definida pelo usuário é tratada como uma chamada de função operator""X<'c1 ﻿', 'c2 ﻿', 'c3 ﻿'..., 'ck ﻿'>(), onde c1..ck são os caracteres individuais de f e todos eles são do [conjunto de caracteres básico](<#/doc/language/charset>).

3) Para literais de string definidos pelo usuário, seja str o literal sem o sufixo ud:

```cpp
a) Se o conjunto de sobrecarga incluir um string literal operator template com um parâmetro de template não-tipo para o qual str é um argumento de template bem-formado, então a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X<str>();  // (desde C++20)
```

b) caso contrário, a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X (str, len), onde len é o comprimento do literal de string, excluindo o caractere nulo de terminação.

4) Para literais de caractere definidos pelo usuário, a expressão literal definida pelo usuário é tratada como uma chamada de função operator ""X(ch), onde ch é o literal sem o sufixo ud.
```cpp
    long double operator ""_w(long double);
    std::string operator ""_w(const char16_t*, size_t);
    unsigned    operator ""_w(const char*);
    
    int main()
    {
        1.2_w;    // calls operator ""_w(1.2L)
        u"one"_w; // calls operator ""_w(u"one", 3)
        12_w;     // calls operator ""_w("12")
        "two"_w;  // error: no applicable literal operator
    }
```

Quando a concatenação de literais de string ocorre na [fase de tradução 6](<#/doc/language/translation_phases>), os literais de string definidos pelo usuário também são concatenados, e seus sufixos ud são ignorados para fins de concatenação, exceto que apenas um sufixo pode aparecer em todos os literais concatenados:
```cpp
    int main()
    {
        L"A" "B" "C"_x;  // OK: same as L"ABC"_x
        "P"_x "Q" "R"_y; // error: two different ud-suffixes (_x and _y)
    }
```

### Literal operators

A função chamada por um literal definido pelo usuário é conhecida como _literal operator_ (ou, se for um template, _literal operator template_). Ela é declarada como qualquer outra [função](<#/doc/language/function>) ou [function template](<#/doc/language/function_template>) no escopo de um namespace (também pode ser uma função friend, uma instanciação explícita ou especialização de um function template, ou introduzida por uma using-declaration), exceto pelas seguintes restrições:

O nome desta função pode ter uma das duas formas:

---
```cpp
`operator ""` identifier | (1) | (deprecated)
`operator` user-defined-string-literal  // (2)
```
- **identifier** — o [identificador](<#/doc/language/name>) a ser usado como o sufixo ud para os literais definidos pelo usuário que chamarão esta função
- **user-defined-string-literal** — a sequência de caracteres `""` seguida, sem espaço, pela sequência de caracteres que se torna o sufixo ud

1) Declara um literal operator.

2) Declara um literal operator. Esta sintaxe torna possível usar palavras-chave da linguagem e [identificadores reservados](<#/doc/keywords>) como sufixos ud, por exemplo, operator ""if do header [`<complex>`](<#/doc/header/complex>).

O sufixo ud deve começar com o underscore `_`: os sufixos que não começam com o underscore são reservados para os literal operators fornecidos pela standard library. Ele também não pode conter underscores duplos `__`: tais sufixos também são reservados.

Se o literal operator for um template, ele deve ter uma lista de parâmetros vazia e pode ter apenas um parâmetro de template, que deve ser um parâmetro de template pack não-tipo com tipo de elemento char (nesse caso, é conhecido como um _numeric literal operator template_):
```cpp
    template<char...>
    double operator ""_x();
```

ou um parâmetro de template não-tipo de tipo de classe (nesse caso, é conhecido como um _string literal operator template_):
```cpp
    struct A { constexpr A(const char*); };
    
    template<A a>
    A operator ""_a();
```

| (desde C++20)

Apenas as seguintes listas de parâmetros são permitidas em literal operators:

---
`(` const char* `)` | (1) |
---|---|---
`(` unsigned long long int `)` | (2) |
`(` long double `)` | (3) |
`(` char `)` | (4) |
`(` wchar_t `)` | (5) |
`(` char8_t `)` | (6) | (desde C++20)
`(` char16_t `)` | (7) |
`(` char32_t `)` | (8) |
`(` const char*` **,` [std::size_t](<#/doc/types/size_t>) `)` | (9) |
`(` const wchar_t*` **,` [std::size_t](<#/doc/types/size_t>) `)` | (10) |
`(` const char8_t*` **,` [std::size_t](<#/doc/types/size_t>) `)` | (11) | (desde C++20)
`(` const char16_t*` **,` [std::size_t](<#/doc/types/size_t>) `)` | (12) |
`(` const char32_t*` **,` [std::size_t](<#/doc/types/size_t>) `)` | (13) |

1) Literal operators com esta lista de parâmetros são os _raw literal operators_, usados como alternativas para literais inteiros e de ponto flutuante definidos pelo usuário (veja acima)

2) Literal operators com estas listas de parâmetros são o literal operator de primeira escolha para literais inteiros definidos pelo usuário

3) Literal operators com estas listas de parâmetros são o literal operator de primeira escolha para literais de ponto flutuante definidos pelo usuário

4-8) Literal operators com estas listas de parâmetros são chamados por literais de caractere definidos pelo usuário

9-13) Literal operators com estas listas de parâmetros são chamados por literais de string definidos pelo usuário

[Argumentos padrão](<#/doc/language/default_arguments>) não são permitidos.

C [language linkage](<#/doc/language/language_linkage>) não é permitido.

Além das restrições acima, literal operators e literal operator templates são funções normais (e function templates), podem ser declarados inline ou constexpr, podem ter linkage interno ou externo, podem ser chamados explicitamente, seus endereços podem ser obtidos, etc.

Execute este código
```cpp
    #include <string>
    
    void        operator ""_km(long double); // OK, will be called for 1.0_km
    void        operator "" _km(long double); // same as above, deprecated
    std::string operator ""_i18n(const char*, std::size_t); // OK
    
    template<char...>
    double operator ""_pi(); // OK
    float  operator ""_e(const char*); // OK
    
    // error: suffix must begin with underscore
    float operator ""Z(const char*);
    
    // error: all names that begin with underscore followed by uppercase
    // letter are reserved (NOTE: a space between "" and _).
    double operator"" _Z(long double);
    
    // OK. NOTE: no space between "" and _.
    double operator""_Z(long double);
    
    // OK: literal operators can be overloaded
    double operator ""_Z(const char* args);
    
    int main() {}
```

### Notas

Desde a introdução dos literais definidos pelo usuário, o código que usa [constantes de macro de formato para tipos inteiros de largura fixa](<#/>) sem espaço após o literal de string precedente tornou-se inválido: [std::printf](<#/doc/io/c/fprintf>)("%"[PRId64](<#/doc/types/integer>)"\n",[INT64_MIN](<#/doc/types/integer>)); deve ser substituído por [std::printf](<#/doc/io/c/fprintf>)("%" [PRId64](<#/doc/types/integer>)"\n",[INT64_MIN](<#/doc/types/integer>));.

Devido ao [maximal munch](<#/doc/language/translation_phases>), literais inteiros e de ponto flutuante definidos pelo usuário terminando em `p`, `P`, (desde C++17) `e` e `E`, quando seguidos pelos operadores `+` ou `-`, devem ser separados do operador por espaço em branco ou parênteses no código-fonte:
```cpp
    long double operator""_E(long double);
    long double operator""_a(long double);
    int operator""_p(unsigned long long);
    
    auto x = 1.0_E+2.0;   // error
    auto y = 1.0_a+2.0;   // OK
    auto z = 1.0_E +2.0;  // OK
    auto q = (1.0_E)+2.0; // OK
    auto w = 1_p+2;       // error
    auto u = 1_p +2;      // OK
```

O mesmo se aplica ao operador ponto seguindo um literal definido pelo usuário inteiro ou de ponto flutuante:
```cpp
    #include <chrono>
    
    using namespace std::literals;
    
    auto a = 4s.count();   // Error
    auto b = 4s .count();  // OK
    auto c = (4s).count(); // OK
```

Caso contrário, um único token de número de pré-processamento inválido (por exemplo, 1.0_E+2.0 ou 4s.count) é formado, o que causa a falha da compilação.

Feature-test macro | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_user_defined_literals`](<#/doc/feature_test>) | [`200809L`](<#/>) | (C++11) | Literais definidos pelo usuário

### Palavras-chave

[`operator`](<#/doc/keyword/operator>)

### Exemplos

Execute este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <iostream>
    #include <numbers>
    #include <string>
    
    // usado como conversão de graus (parâmetro de entrada) para radianos (saída retornada)
    constexpr long double operator""_deg_to_rad(long double deg)
    {
        long double radians = deg * std::numbers::pi_v<long double> / 180;
        return radians;
    }
    
    // usado com tipo personalizado
    struct mytype
    {
        unsigned long long m;
    };
    
    constexpr mytype operator""_mytype(unsigned long long n)
    {
        return mytype{n};
    }
    
    // usado para efeitos colaterais
    void operator""_print(const char* str)
    {
        std::cout << str << '\n';
    }
    
    #if __cpp_nontype_template_args < 201911
    
    std::string operator""_x2 (const char* str, std::size_t)
    {
        return std::string{str} + str;
    }
    
    #else // string literal operator template do C++20
    
    template<std::size_t N>
    struct DoubleString
    {
        char p[N + N - 1]{};
    
        constexpr DoubleString(char const(&pp)[N])
        {
            std::ranges::copy(pp, p);
            std::ranges::copy(pp, p + N - 1);
        }
    };
    
    template<DoubleString A>
    constexpr auto operator""_x2()
    {
        return A.p;
    }
    
    #endif // C++20
    
    int main()
    {
        double x_rad = 90.0_deg_to_rad;
        std::cout << std::fixed << x_rad << '\n';
    
        mytype y = 123_mytype;
        std::cout << y.m << '\n';
    
        0x123ABC_print;
        std::cout << "abc"_x2 << '\n';
    }
```

Saída:
```
    1.570796
    123
    0x123ABC
    abcabc
```

### Standard library

Os seguintes literal operators são definidos na standard library:

Definido no inline namespace `std::literals::complex_literals`
---
[ operator""ifoperator""ioperator""il](<#/doc/numeric/complex/operator_q__q_i>)(C++14) | um literal [std::complex](<#/doc/numeric/complex>) representando um número puramente imaginário
(função)
Definido no inline namespace `std::literals::chrono_literals`

```cpp
 operator""h(C++14)
(função)
 operator""min(C++14)
(função)
 operator""s(C++14)
(função)
 operator""ms(C++14)
(função)
 operator""us(C++14)
(função)
 operator""ns(C++14)
(função)
 operator""y(C++20)
(função)
 operator""d(C++20)
(função)
Definido no inline namespace `std::literals::string_literals`
 operator""s(C++14)
(função)
Definido no inline namespace `std::literals::string_view_literals`
 operator""sv(C++17)
(função)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1473](<https://cplusplus.github.io/CWG/issues/1473.html>) | C++11 | espaço em branco entre "" e ud-suffix era exigido na declaração de literal operators | tornou-se opcional
[CWG 1479](<https://cplusplus.github.io/CWG/issues/1479.html>) | C++11 | literal operators podiam ter argumentos padrão | proibido
[CWG 2521](<https://cplusplus.github.io/CWG/issues/2521.html>) | C++11 | operator"" _Bq era malformado (nenhum diagnóstico exigido) porque usa o identificador reservado `_Bq` | depreciou a sintaxe do literal operator com espaço em branco entre "" e ud-suffix