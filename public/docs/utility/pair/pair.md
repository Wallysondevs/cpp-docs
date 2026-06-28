# std::pair&lt;T1,T2&gt;::pair

```cpp
pair(); | (1) | (constexpr desde C++11)
(conditionally explicit desde C++11)
pair( const T1& x, const T2& y ); | (2) | (conditionally explicit desde C++11)
(constexpr desde C++14)
  // (3)
template< class U1, class U2 >
pair( U1&& x, U2&& y );  // (desde C++11)
(ate C++23)
(constexpr desde C++14)
(conditionally explicit)
template< class U1 = T1, class U2 = T2 >
constexpr pair( U1&& x, U2&& y );  // (desde C++23)
(conditionally explicit)
template< class U1, class U2 >
constexpr pair( pair<U1, U2>& p );  // (4) (desde C++23)
(conditionally explicit)
template< class U1, class U2 >
pair( const pair<U1, U2>& p ); | (5) | (conditionally explicit desde C++11)
(constexpr desde C++14)
template< class U1, class U2 >
pair( pair<U1, U2>&& p ); | (6) | (constexpr desde C++14)
(conditionally explicit desde C++11)
template< class U1, class U2 >
constexpr pair( const pair<U1, U2>&& p );  // (7) (desde C++23)
(conditionally explicit)
template< pair-like P >
constexpr pair ( P&& u );  // (8) (desde C++23)
(conditionally explicit)
template< class... Args1, class... Args2 >
pair( std::piecewise_construct_t,
std::tuple<Args1...> first_args,
std::tuple<Args2...> second_args );  // (9) (desde C++11)
(constexpr desde C++20)
pair( const pair& p ) = default;  // (10)
pair( pair&& p ) = default;  // (11) (desde C++11)
```

Constrói um novo par.

1) Construtor padrão. Inicializa por valor ambos os elementos do par, `first` e `second`. Este construtor participa da resolução de sobrecarga se e somente se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T1&gt; e [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T2&gt; forem ambos verdadeiros. Este construtor é explicit se e somente se `T1` ou `T2` não for implicitamente construível por padrão. | (desde C++11)

2) Inicializa `first` com x e `second` com y. Este construtor participa da resolução de sobrecarga se e somente se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T1&gt; e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T2&gt; forem ambos verdadeiros. Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const T1&, T1&gt; for falso ou [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const T2&, T2&gt; for falso. | (desde C++11)

3) Inicializa `first` com [std::forward](<#/doc/utility/forward>)&lt;U1&gt;(x) e `second` com [std::forward](<#/doc/utility/forward>)&lt;U2&gt;(y).

Este construtor participa da resolução de sobrecarga se e somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, U1> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, U2> forem ambos verdadeiros.

```cpp
Este construtor é explicit se e somente se std::is_convertible_v<U1, T1> for falso ou std::is_convertible_v<U2, T2> for falso. Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário.  // (desde C++23)
```

4) Inicializa `first` com p.first e `second` com p.second.

Este construtor participa da resolução de sobrecarga se e somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, U1&> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, U2&> forem ambos verdadeiros.

Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<U1&, T1> for falso ou [std::is_convertible_v](<#/doc/types/is_convertible>)<U2&, T2> for falso.

Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário.

5) Inicializa `first` com p.first e `second` com p.second. Este construtor participa da resolução de sobrecarga se e somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, const U1&> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, const U2&> forem ambos verdadeiros. Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U1&, T1&gt; for falso ou [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U2&, T2&gt; for falso. | (desde C++11)
---|---
Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário. | (desde C++23)

6) Inicializa `first` com [std::forward](<#/doc/utility/forward>)&lt;U1&gt;(p.first) e `second` com [std::forward](<#/doc/utility/forward>)&lt;U2&gt;(p.second).

Este construtor participa da resolução de sobrecarga se e somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, U1> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, U2> forem ambos verdadeiros.

```cpp
Este construtor é explicit se e somente se std::is_convertible_v<U1, T1> for falso ou std::is_convertible_v<U2, T2> for falso. Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário.  // (desde C++23)
```

7) Inicializa `first` com [std::forward](<#/doc/utility/forward>)&lt;const U1&gt;(p.first) e `second` com [std::forward](<#/doc/utility/forward>)&lt;const U2&gt;(p.second).

Este construtor participa da resolução de sobrecarga se e somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, U1> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, U2> forem ambos verdadeiros.

Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U1, T1&gt; for falso ou [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U2, T2&gt; for falso.

Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário.

8) Dado u1 como `std::get<0>(std::forward(u))` e u2 como `std::get<1>(std::forward(u))`, denote seus tipos como `U1` e `U2` respectivamente. Inicializa `first` com u1 e `second` com u2.

Este construtor participa da resolução de sobrecarga se e somente se

*   [std::remove_cvref](<#/doc/types/remove_cvref>)(P) não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>),
*   [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, U1> for verdadeiro, e
*   [std::is_constructible_v](<#/doc/types/is_constructible>)<T2, U2> for verdadeiro.

Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<U1, T1> for falso ou [std::is_convertible_v](<#/doc/types/is_convertible>)<U2, T2> for falso.

Este construtor é definido como deleted se a inicialização de `first` ou `second` ligasse uma referência a um objeto temporário.

9) Encaminha os elementos de first_args para o construtor de `first` e encaminha os elementos de second_args para o construtor de `second`. Este é o único construtor não padrão que pode ser usado para criar um par de tipos não copiáveis e não movíveis. O programa é malformado se `first` ou `second` for uma referência e estiver ligada a um objeto temporário.

10) O construtor de cópia é implicitamente declarado (até C++11) como defaulted, e é constexpr se a cópia de ambos os elementos satisfizer os requisitos para funções constexpr (desde C++11).

11) O construtor de movimento é defaulted, e é constexpr se o movimento de ambos os elementos satisfizer os requisitos para funções constexpr.

### Parâmetros

- **x** — valor para inicializar o primeiro elemento deste par
- **y** — valor para inicializar o segundo elemento deste par
- **p** — par de valores usado para inicializar ambos os elementos deste par
- **u** — objeto `_pair-like_` de valores usado para inicializar ambos os elementos deste par
- **first_args** — tuple de argumentos do construtor para inicializar o primeiro elemento deste par
- **second_args** — tuple de argumentos do construtor para inicializar o segundo elemento deste par

### Exceções

Não lança exceções a menos que uma das operações especificadas (por exemplo, construtor de um elemento) lance.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    #include <string>
    #include <tuple>
    #include <utility>
    
    int main()
    {
        auto print = 
        {
            std::cout << rem << "(" << pair.first << ", " << pair.second << ")\n";
        };
    
        std::pair<int, float> p1;
        print("(1) Value-initialized: ", p1);
    
        std::pair<int, double> p2{42, 3.1415};
        print("(2) Initialized with two values: ", p2);
    
        std::pair<char, int> p4{p2};
        print("(4) Implicitly converted: ", p4);
    
        std::pair<std::complex<double>, std::string> p6
            {std::piecewise_construct, std::forward_as_tuple(0.123, 7.7),
                std::forward_as_tuple(10, 'a')};
        print("(8) Piecewise constructed: ", p6);
    }
```

Saída possível:
```
    (1) Value-initialized: (0, 0)
    (2) Initialized with two values: (42, 3.1415)
    (4) Implicitly converted: (*, 3)
    (8) Piecewise constructed: ((0.123,7.7), aaaaaaaaaa)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 265](<https://cplusplus.github.io/LWG/issue265>) | C++98 | o construtor padrão inicializava por cópia `first` e `second` com T1() e T2() respectivamente (assim exigia que `T1` e `T2` fossem [CopyConstructible](<#/doc/named_req/CopyConstructible>)) | `first` e `second` são inicializados por valor
[LWG 2510](<https://cplusplus.github.io/LWG/issue2510>) | C++11 | o construtor padrão era implícito | tornou-se condicionalmente explicit
[N4387](<https://wg21.link/N4387>) | C++11 | alguns construtores eram apenas implícitos, impedindo alguns usos | construtores tornados condicionalmente explicit

### Veja também

[ make_pair](<#/doc/utility/pair/make_pair>) | cria um objeto `pair` de um tipo, determinado pelos tipos dos argumentos
(modelo de função)
[ (constructor)](<#/doc/utility/tuple/tuple>) | constrói um novo `tuple`
(função membro pública de `std::tuple<Types...>`)