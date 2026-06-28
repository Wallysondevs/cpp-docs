# std::tuple&lt;Types...&gt;::tuple

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
constexpr tuple();
(conditionally explicit)
tuple( const Types&... args );
(constexpr desde C++14)
(conditionally explicit)
template< class... UTypes >
tuple( UTypes&&... args );
(constexpr desde C++14)
(conditionally explicit)
template< class... UTypes >
constexpr tuple( tuple<UTypes...>& other );
(conditionally explicit)
template< class... UTypes >
tuple( const tuple<UTypes...>& other );
(constexpr desde C++14)
(conditionally explicit)
template< class... UTypes >
tuple( tuple<UTypes...>&& other );
(constexpr desde C++14)
(conditionally explicit)
template< class... UTypes >
constexpr tuple( const tuple<UTypes...>&& other );
(conditionally explicit)
template< class U1, class U2 >
constexpr tuple( std::pair<U1, U2>& p );
(conditionally explicit)
template< class U1, class U2 >
tuple( const std::pair<U1, U2>& p );
(constexpr desde C++14)
(conditionally explicit)
template< class U1, class U2 >
tuple( std::pair<U1, U2>&& p );
(constexpr desde C++14)
(conditionally explicit)
template< class U1, class U2 >
constexpr tuple( const std::pair<U1, U2>&& p );
(conditionally explicit)
template< tuple-like UTuple >
constexpr tuple( UTuple&& u );
(conditionally explicit)
tuple( const tuple& other ) = default;
tuple( tuple&& other ) = default;
Construtores estendidos por alocador
template< class Alloc >
tuple( std::allocator_arg_t, const Alloc& a );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc >
tuple( std::allocator_arg_t, const Alloc& a,
const Types&... args );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class... UTypes >
tuple( std::allocator_arg_t, const Alloc& a,
UTypes&&... args );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class... UTypes >
constexpr tuple( std::allocator_arg_t, const Alloc& a,
tuple<UTypes...>& other );
(conditionally explicit)
template< class Alloc, class... UTypes >
tuple( std::allocator_arg_t, const Alloc& a,
const tuple<UTypes...>& other );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class... UTypes >
tuple( std::allocator_arg_t, const Alloc& a,
tuple<UTypes...>&& other );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class... UTypes >
constexpr tuple( std::allocator_arg_t, const Alloc& a,
const tuple<UTypes...>&& other );
(conditionally explicit)
template< class Alloc, class U1, class U2 >
constexpr tuple( std::allocator_arg_t, const Alloc& a,
std::pair<U1, U2>& p );
(conditionally explicit)
template< class Alloc, class U1, class U2 >
tuple( std::allocator_arg_t, const Alloc& a,
const std::pair<U1, U2>& p );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class U1, class U2 >
tuple( std::allocator_arg_t, const Alloc& a,
std::pair<U1, U2>&& p );
(constexpr desde C++20)
(conditionally explicit)
template< class Alloc, class U1, class U2 >
constexpr tuple( std::allocator_arg_t, const Alloc& a,
const std::pair<U1, U2>&& p );
(conditionally explicit)
template< class Alloc, tuple-like UTuple >
constexpr tuple( std::allocator_arg_t, const Alloc& a, UTuple&& u );
(conditionally explicit)
template< class Alloc >
tuple( std::allocator_arg_t, const Alloc& a,
const tuple& other );
(constexpr desde C++20)
template< class Alloc >
tuple( std::allocator_arg_t, const Alloc& a,
tuple&& other );
(constexpr desde C++20)
```

Constrói uma nova tuple.

Nas descrições a seguir, seja

*   `i` no intervalo `[`0`, `sizeof...(Types)`)` em ordem,
*   `Ti` o `i`-ésimo tipo em `Types`, e
*   `Ui` o `i`-ésimo tipo em um pacote de parâmetros de template chamado `UTypes`,

onde a indexação é baseada em zero.

1)  Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) todos os elementos, se houver. O construtor padrão é trivial se sizeof...(Types) == 0.
    *   Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_default_constructible](<#/doc/types/is_default_constructible>)<Ti>::value for verdadeiro para todo i.
    *   O construtor é explicit se e somente se `Ti` não for copy-list-initializable de {} para pelo menos um i.

2)  Construtor direto. Inicializa cada elemento da tuple com o parâmetro correspondente.
    *   Esta sobrecarga participa da resolução de sobrecarga apenas se sizeof...(Types) >= 1 e [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)<Ti>::value for verdadeiro para todo i.
    *   Este construtor é explicit se e somente se [std::is_convertible](<#/doc/types/is_convertible>)<const Ti&, Ti>::value for falso para pelo menos um i.

3)  Construtor de conversão. Inicializa cada elemento da tuple com o valor correspondente em [std::forward](<#/doc/utility/forward>)&lt;UTypes&gt;(args).
    *   Esta sobrecarga participa da resolução de sobrecarga apenas se
        *   sizeof...(Types) == sizeof...(UTypes),
        *   sizeof...(Types) >= 1,
        *   [std::is_constructible](<#/doc/types/is_constructible>)<Ti, Ui>::value for verdadeiro para todo i, e
        *   seja `D` [std::decay](<#/doc/types/decay>)<U0>::type(ate C++20)[std::remove_cvref_t](<#/doc/types/remove_cvref>)<U0>(desde C++20),
            *   se sizeof...(Types) == 1, então `D` não é `std::tuple`, caso contrário,
            *   se sizeof...(Types) == 2 ou sizeof...(Types) == 3, então ou `D` não é [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), ou `T0` é [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>).
    *   O construtor é explicit se e somente se [std::is_convertible](<#/doc/types/is_convertible>)<Ui, Ti>::value for falso para pelo menos um i.

    *   Este construtor é definido como deleted se a inicialização de qualquer elemento que seja uma referência o [associaria a um objeto temporário](<#/doc/language/reference_initialization>).

| (desde C++23)

4-7) Construtor de conversão. Inicializa cada elemento da tuple com o elemento correspondente de other.

Formalmente, seja FWD(other) [std::forward](<#/doc/utility/forward>)<decltype(other)>(other), para todo i, inicializa o `i`-ésimo elemento da tuple com std::get<i>(FWD(other)).

*   Esta sobrecarga participa da resolução de sobrecarga apenas se
    *   sizeof...(Types) == sizeof...(UTypes),
    *   [std::is_constructible_v](<#/doc/types/is_constructible>)<Ti, decltype(std::get<i>(FWD(other)))> for verdadeiro para todo i, e
    *   ou
        *   sizeof...(Types) não é 1, ou
        *   (quando `Types...` se expande para `T` e `UTypes...` se expande para `U`) [std::is_convertible_v](<#/doc/types/is_convertible>)<decltype(other), T>, [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype(other)>, e [std::is_same_v](<#/doc/types/is_same>)<T, U> são todos falsos.
*   Estes construtores são explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<decltype(std::get<i>(FWD(other))), Ti> for falso para pelo menos um i.

*   Estes construtores são definidos como deleted se a inicialização de qualquer elemento que seja uma referência o associaria a um objeto temporário.

| (desde C++23)

8-11) Construtor de par. Constrói uma tuple de 2 elementos com cada elemento construído a partir do elemento correspondente de p.

Formalmente, seja FWD(p) [std::forward](<#/doc/utility/forward>)<decltype(p)>(p), inicializa o primeiro elemento com std::get<0>(FWD(p)) e o segundo elemento com std::get<1>(FWD(p)).

*   Esta sobrecarga participa da resolução de sobrecarga apenas se
    *   sizeof...(Types) == 2,
    *   [std::is_constructible_v](<#/doc/types/is_constructible>)<T0, decltype(std::get<0>(FWD(p)))> for verdadeiro, e
    *   [std::is_constructible_v](<#/doc/types/is_constructible>)<T1, decltype(std::get<1>(FWD(p)))> for verdadeiro.
*   O construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<decltype(std::get<0>(FWD(p))), T0> ou [std::is_convertible_v](<#/doc/types/is_convertible>)<decltype(std::get<1>(FWD(p))), T1> for falso.

*   Estes construtores são definidos como deleted se a inicialização de qualquer elemento que seja uma referência o associaria a um objeto temporário.

| (desde C++23)

12) Construtor `_tuple-like_`. Constrói uma tuple com cada elemento construído a partir do elemento correspondente de u.

Formalmente, para todo i, inicializa o `i`-ésimo elemento da tuple com std::get<i>([std::forward](<#/doc/utility/forward>)&lt;UTuple&gt;(u)).

*   Esta sobrecarga participa da resolução de sobrecarga apenas se
    *   [std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<UTuple>, [std::tuple](<#/doc/utility/tuple>)> for falso,
    *   [std::remove_cvref_t](<#/doc/types/remove_cvref>)<UTuple> não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>),
    *   sizeof...(Types) for igual a [std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<UTuple>>,
    *   [std::is_constructible_v](<#/doc/types/is_constructible>)<Ti, decltype(std::get<i>([std::forward](<#/doc/utility/forward>)<UTuple>(u)))> for verdadeiro para todo i, e
    *   ou
        *   sizeof...(Types) não for 1, ou
        *   (quando `Types...` se expande para `T`) [std::is_convertible_v](<#/doc/types/is_convertible>)<UTuple, T> e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, UTuple> forem ambos falsos.
*   Este construtor é definido como deleted se a inicialização de qualquer elemento que seja uma referência o associaria a um objeto temporário.

13) Construtor de cópia implicitamente definido. Inicializa cada elemento da tuple com o elemento correspondente de other.
    *   Este construtor é constexpr se cada operação que ele executa for constexpr. Para a tuple vazia [std::tuple](<#/doc/utility/tuple>)<>, ele é constexpr.
    *   [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)<Ti>::value deve ser verdadeiro para todo i, caso contrário o comportamento é indefinido(ate C++20)o programa é malformado(desde C++20).

14) Construtor de movimento implicitamente definido. Para todo i, inicializa o `i`-ésimo elemento da tuple com [std::forward](<#/doc/utility/forward>)&lt;Ui&gt;(std::get<i>(other)).
    *   Este construtor é constexpr se cada operação que ele executa for constexpr. Para a tuple vazia [std::tuple](<#/doc/utility/tuple>)<>, ele é constexpr.
    *   [std::is_move_constructible](<#/doc/types/is_move_constructible>)<Ti>::value deve ser verdadeiro para todo i, caso contrário o comportamento é indefinido(ate C++20)esta sobrecarga não participa da resolução de sobrecarga(desde C++20).

15-28) Idêntico a (1-14), exceto que cada elemento é criado por [construção uses-allocator](<#/doc/memory/uses_allocator>), ou seja, o objeto Allocator a é passado como um argumento adicional para o construtor de cada elemento para o qual [std::uses_allocator](<#/doc/memory/uses_allocator>)<Ui, Alloc>::value for verdadeiro.

### Parâmetros

- **args** — valores usados para inicializar cada elemento da tuple
- **other** — a tuple de valores usada para inicializar cada elemento da tuple
- **p** — o par de valores usado para inicializar ambos os elementos da 2-tuple
- **u** — o objeto [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) de valores usado para inicializar cada elemento da tuple
- **a** — o alocador a ser usado na construção uses-allocator

### Notas

Construtores condicionalmente explicit tornam possível construir uma tuple em contexto de inicialização por cópia usando a sintaxe de inicialização por lista:
```cpp
    std::tuple<int, int> foo_tuple() 
    {
        // return {1, -1};             // Error before N4387
        return std::make_tuple(1, -1); // Always works
    }
```

Note que se algum elemento da lista não for implicitamente conversível para o elemento correspondente da tuple de destino, os construtores se tornam explicit:
```cpp
    using namespace std::chrono;
    void launch_rocket_at(std::tuple<hours, minutes, seconds>);
    
    launch_rocket_at({hours(1), minutes(2), seconds(3)}); // OK
    launch_rocket_at({1, 2, 3}); // Error: int is not implicitly convertible to duration
    launch_rocket_at(std::tuple<hours, minutes, seconds>{1, 2, 3}); // OK
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <string>
    #include <string_view>
    #include <tuple>
    #include <type_traits>
    #include <vector>
    
    // helper function to print a vector to a stream
    template<class Os, class T>
    Os& operator<<(Os& os, std::vector<T> const& v)
    {
        os << '{';
        for (auto i{v.size()}; const T& e : v)
            os << e << (--i ? "," : "");
        return os << '}';
    }
    
    template<class T>
    void print_single(T const& v)
    {
        if constexpr (std::is_same_v<T, std::decay_t<std::string>>)
            std::cout << std::quoted(v);
        else if constexpr (std::is_same_v<std::decay_t<T>, char>)
            std::cout << "'" << v << "'";
        else
            std::cout << v;
    }
    
    // helper function to print a tuple of any size
    template<class Tuple, std::size_t N>
    struct TuplePrinter
    {
        static void print(const Tuple& t)
        {
            TuplePrinter<Tuple, N - 1>::print(t);
            std::cout << ", ";
            print_single(std::get<N - 1>(t));
        }
    };
    
    template<class Tuple>
    struct TuplePrinter<Tuple, 1>
    {
        static void print(const Tuple& t)
        {
            print_single(std::get<0>(t));
        }
    };
    
    template<class... Args>
    void print(std::string_view message, const std::tuple<Args...>& t)
    {
        std::cout << message << " (";
        TuplePrinter<decltype(t), sizeof...(Args)>::print(t);
        std::cout << ")\n";
    }
    // end helper function
    
    int main()
    {
        std::tuple<int, std::string, double> t1;
        print("Value-initialized, t1:", t1);
    
        std::tuple<int, std::string, double> t2{42, "Test", -3.14};
        print("Initialized with values, t2:", t2);
    
        std::tuple<char, std::string, int> t3{t2};
        print("Implicitly converted, t3:", t3);
    
        std::tuple<int, double> t4{std::make_pair(42, 3.14)};
        print("Constructed from a pair, t4:", t4);
    
        // given Allocator my_alloc with a single-argument constructor
        // my_alloc(int); use my_alloc(1) to allocate 5 ints in a vector
        using my_alloc = std::allocator<int>;
        std::vector<int, my_alloc> v{5, 1, my_alloc{/* 1 */}};
    
        // use my_alloc(2) to allocate 5 ints in a vector in a tuple
        std::tuple<int, std::vector<int, my_alloc>, double> t5
            {std::allocator_arg, my_alloc{/* 2 */}, 42, v, -3.14};
        print("Constructed with allocator, t5:", t5);
    }
```

Saída possível:
```
    Value-initialized, t1: (0, "", 0)
    Initialized with values, t2: (42, "Test", -3.14)
    Implicitly converted, t3: ('*', "Test", -3)
    Constructed from a pair, t4: (42, 3.14)
    Constructed with allocator, t5: (42, {1,1,1,1,1}, -3.14)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2510](<https://cplusplus.github.io/LWG/issue2510>) | C++11 | construtor padrão era implícito | tornou condicionalmente-explicit
[LWG 3121](<https://cplusplus.github.io/LWG/issue3121>) | C++11 | construtor de 1-tuple poderia verificar recursivamente as restrições; argumento `allocator_arg_t` causou ambiguidade | restringiu ainda mais o construtor
[LWG 3158](<https://cplusplus.github.io/LWG/issue3158>) | C++11 | o construtor uses-allocator correspondente ao construtor padrão era implícito | tornou condicionalmente-explicit
[LWG 3211](<https://cplusplus.github.io/LWG/issue3211>) | C++11 | se o construtor padrão de `tuple<>` é trivial era não especificado | exige ser trivial
[LWG 4045](<https://cplusplus.github.io/LWG/issue4045>) | C++23 | construtor `_tuple-like_` pode potencialmente criar referências pendentes | tornou definido como deleted
[N4387](<https://wg21.link/N4387>) | C++11 | alguns construtores eram explicit, impedindo comportamento útil | a maioria dos construtores tornou-se condicionalmente-explicit

### Veja também

[ operator=](<#/>) | atribui o conteúdo de uma `tuple` a outra
(função membro pública)
[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [referências de encaminhamento](<#/doc/language/reference>)
(modelo de função)
[ (constructor)](<#/doc/utility/pair/pair>) | constrói um novo `pair`
(função membro pública de `std::pair<T1,T2>`)