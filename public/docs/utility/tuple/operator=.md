# std::tuple&lt;Types...&gt;::operator=

```cpp
tuple& operator=( const tuple& other );  // (1) (desde C++11)
(constexpr desde C++20)
constexpr const tuple& operator=( const tuple& other ) const;  // (2) (desde C++23)
tuple& operator=( tuple&& other ) noexcept(/* see below */);  // (3) (desde C++11)
(constexpr desde C++20)
constexpr const tuple& operator=( tuple&& other ) const;  // (4) (desde C++23)
template< class... UTypes >
tuple& operator=( const tuple<UTypes...>& other );  // (5) (desde C++11)
(constexpr desde C++20)
template< class... UTypes >
constexpr const tuple& operator=( const tuple<UTypes...>& other ) const;  // (6) (desde C++23)
template< class... UTypes >
tuple& operator=( tuple<UTypes...>&& other );  // (7) (desde C++11)
(constexpr desde C++20)
template< class... UTypes >
constexpr const tuple& operator=( tuple<UTypes...>&& other ) const;  // (8) (desde C++23)
template< class E1, class E2 >
tuple& operator=( const std::pair<E1, E2>& p );  // (9) (desde C++11)
(constexpr desde C++20)
template< class E1, class E2 >
constexpr const tuple& operator=( const std::pair<E1, E2>& p ) const;  // (10) (desde C++23)
template< class E1, class E2 >
tuple& operator=( std::pair<E1, E2>&& p );  // (11) (desde C++11)
(constexpr desde C++20)
template< class E1, class E2 >
constexpr const tuple& operator=( std::pair<E1, E2>&& p ) const;  // (12) (desde C++23)
template< tuple-like UTuple >
constexpr tuple& operator=( UTuple&& u );  // (13) (desde C++23)
template< tuple-like UTuple >
constexpr const tuple& operator=( UTuple&& u ) const;  // (14) (desde C++23)
```

Substitui o conteúdo da tupla pelo conteúdo de outro objeto tipo-tuple.

Nas descrições a seguir, considere

*   `i` no intervalo `[`​0​`, `sizeof...(Types)`)` em ordem,
*   `Ti` o `i`-ésimo tipo no pacote de parâmetros de template de classe `Types`, e
*   `Ui` o `i`-ésimo tipo em um pacote de parâmetros de template de função chamado `UTypes`,

onde a indexação é baseada em zero.

1) Operador de atribuição de cópia. Atribui cada elemento de `other` ao elemento correspondente de `*this`.

Esta sobrecarga é definida como deletada a menos que [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)&lt;Ti&gt;::value seja `true` para todos os `Ti`.

2) Operador de atribuição de cópia para operando qualificado como `const`. Atribui cada elemento de `other` ao elemento correspondente de `*this`.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;const Ti&gt; for `true` para todos os `Ti`.

3) Operador de atribuição de movimento. Para todo `i`, atribui [std::forward](<#/doc/utility/forward>)&lt;Ti&gt;(std::get<i>(other)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_assignable](<#/doc/types/is_move_assignable>)&lt;Ti&gt;::value for `true` para todos os `Ti`.

4) Operador de atribuição de movimento para operando qualificado como `const`. Para todo `i`, atribui [std::forward](<#/doc/utility/forward>)&lt;Ti&gt;(std::get<i>(other)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const Ti&, Ti&gt; for `true` para todos os `Ti`.

5) Para todo `i`, atribui std::get<i>(other) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se `sizeof...(Types) == sizeof...(UTypes)`, e [std::is_assignable](<#/doc/types/is_assignable>)<Ti&, const Ui&>::value for `true` para todos os pares correspondentes de tipos `Ti` e `Ui`.

6) Para todo `i`, atribui std::get<i>(other) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se `sizeof...(Types) == sizeof...(UTypes)`, e [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const Ti&, const Ui&&gt; for `true` para todos os pares correspondentes de tipos `Ti` e `Ui`.

7) Para todo `i`, atribui [std::forward](<#/doc/utility/forward>)&lt;Ui&gt;(std::get<i>(other)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se `sizeof...(Types) == sizeof...(UTypes)`, e [std::is_assignable](<#/doc/types/is_assignable>)<Ti&, Ui>::value for `true` para todos os pares correspondentes de tipos `Ti` e `Ui`.

8) Para todo `i`, atribui [std::forward](<#/doc/utility/forward>)&lt;Ui&gt;(std::get<i>(other)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se `sizeof...(Types) == sizeof...(UTypes)`, e [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const Ti&, Ui&gt; for `true` para todos os pares correspondentes de tipos `Ti` e `Ui`.

9) Atribui `p.first` ao primeiro elemento de `*this` e `p.second` ao segundo elemento de `*this`.

Esta sobrecarga participa da resolução de sobrecarga somente se

*   `sizeof...(Types) == 2`,
*   [std::is_assignable](<#/doc/types/is_assignable>)<T0&, const E1&>::value for `true`, e
*   [std::is_assignable](<#/doc/types/is_assignable>)<T1&, const E2&>::value for `true`.

10) Atribui `p.first` ao primeiro elemento e `p.second` ao segundo elemento.

Esta sobrecarga participa da resolução de sobrecarga somente se

*   `sizeof...(Types) == 2`,
*   [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T0&, const E1&&gt; for `true`, e
*   [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T1&, const E2&&gt; for `true`.

11) Atribui [std::forward](<#/doc/utility/forward>)&lt;E1&gt;(p.first) ao primeiro elemento de `*this` e [std::forward](<#/doc/utility/forward>)&lt;E2&gt;(p.second) ao segundo elemento de `*this`.

Esta sobrecarga participa da resolução de sobrecarga somente se

*   `sizeof...(Types) == 2`,
*   [std::is_assignable_v](<#/doc/types/is_assignable>)<T0&, E1> for `true`, e
*   [std::is_assignable_v](<#/doc/types/is_assignable>)<T1&, E2> for `true`.

12) Atribui [std::forward](<#/doc/utility/forward>)&lt;E1&gt;(p.first) ao primeiro elemento e [std::forward](<#/doc/utility/forward>)&lt;E2&gt;(p.second) ao segundo elemento.

Esta sobrecarga participa da resolução de sobrecarga somente se

*   `sizeof...(Types) == 2`,
*   [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T0&, E1&gt; for `true`, e
*   [std::is_assignable_v](<#/doc/types/is_assignable>)&lt;const T1&, E2&gt; for `true`.

13) Para todo `i`, atribui std::get<i>([std::forward](<#/doc/utility/forward>)&lt;UTuple&gt;(u)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se

*   [std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt;, [std::tuple](<#/doc/utility/tuple>)> for `false`,
*   [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt; não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>),
*   `sizeof...(Types)` for igual a [std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt;>, e
*   [std::is_assignable_v](<#/doc/types/is_assignable>)<Ti&, decltype(std::get<i>([std::forward](<#/doc/utility/forward>)&lt;UTuple&gt;(u)))> for `true` para todo `i`.

14) Para todo `i`, atribui std::get<i>([std::forward](<#/doc/utility/forward>)&lt;UTuple&gt;(u)) a std::get<i>(*this).

Esta sobrecarga participa da resolução de sobrecarga somente se

*   [std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt;, [std::tuple](<#/doc/utility/tuple>)> for `false`,
*   [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt; não for uma especialização de [std::ranges::subrange](<#/doc/ranges/subrange>),
*   `sizeof...(Types)` for igual a [std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;UTuple&gt;>, e
*   [std::is_assignable_v](<#/doc/types/is_assignable>)<const Ti&, decltype(std::get<i>([std::forward](<#/doc/utility/forward>)&lt;UTuple&gt;(u)))> for `true` para todo `i`.

### Parâmetros

- **other** — tupla para substituir o conteúdo desta tupla
- **p** — par para substituir o conteúdo desta tupla de 2 elementos
- **u** — objeto [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) para substituir o conteúdo desta tupla

### Valor de retorno

`*this`

### Exceções

1,2) Pode lançar exceções definidas pela implementação se a atribuição de um dos tipos em `Types` lançar uma exceção.

3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(

[std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)&lt;T0&gt;::value &&
[std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)&lt;T1&gt;::value &&
[std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)&lt;T2&gt;::value &&
...

)

4-14) Pode lançar exceções definidas pela implementação se a atribuição de um dos tipos em `Types` lançar uma exceção.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <tuple>
    #include <utility>
    #include <vector>
    
    // função auxiliar para imprimir std::vector<int>
    std::ostream& operator<<(std::ostream& os, std::vector<int> const& v)
    {
        os << '{';
        for (std::size_t t = 0; t != v.size(); ++t)
            os << v[t] << (t + 1 < v.size() ? ", " : "");
        return os << '}';
    }
    
    // funções auxiliares para imprimir uma tupla de qualquer tamanho
    template<class... Args>
    void print_tuple(std::string_view name, const std::tuple<Args...>& t)
    {
        std::cout << name << " = {";
        std::apply(&
        {
            std::cout << arg;
            ((std::cout << ", " << args), ...);
        }, t);
        std::cout << '}';
    }
    
    template<class Tuple1, class Tuple2>
    void print_tuples(std::string_view name1, const Tuple1& t1,
                      std::string_view name2, const Tuple2& t2)
    {
        print_tuple(name1, t1);
        std::cout << ", ";
        print_tuple(name2, std::tuple(t2));
        std::cout << "\n\n";
    }
    
    int main()
    {
        // Exemplos de tupla para tupla //
        std::tuple<int, std::string, std::vector<int>>
            t1{1, "alpha", {1, 2, 3}},
            t2{2, "beta", {4, 5}};
        print_tuples("1) t1", t1, "t2", t2);
    
        // Atribuição de cópia normal
        // operator=( const tuple& other );
        t1 = t2;
        print_tuples("2) t1 = t2;\n   t1", t1, "t2", t2);
    
        // Atribuição de movimento normal
        // operator=( tuple&& other );
        t1 = std::move(t2);
        print_tuples("3) t1 = std::move(t2);\n   t1", t1, "t2", t2);
    
        // Atribuição de cópia com conversão
        // operator=( const tuple<UTypes...>& other );
        std::tuple<short, const char*, std::vector<int>> t3{3, "gamma", {6, 7, 8}};
        t1 = t3;
        print_tuples("4) t1 = t3;\n   t1", t1, "t3", t3);
    
        // Atribuição de movimento com conversão
        // operator=( tuple<UTypes...>&& other );
        t1 = std::move(t3);
        print_tuples("5) t1 = std::move(t3);\n   t1", t1, "t3", t3);
    
        // Exemplos de par para tupla //
        std::tuple<std::string, std::vector<int>> t4{"delta", {10, 11, 12}};
        std::pair<const char*, std::vector<int>> p1{"epsilon", {14, 15, 16}};
        print_tuples("6) t4", t4, "p1", p1);
    
        // Atribuição de cópia com conversão de std::pair
        // operator=( const std::pair<U1, U2>& p );
        t4 = p1;
        print_tuples("7) t4 = p1;\n   t4", t4, "p1", p1);
    
        // Atribuição de movimento com conversão de std::pair
        // operator=( std::pair<U1, U2>&& p );
        t4 = std::move(p1);
        print_tuples("8) t4 = std::move(p1);\n   t4", t4, "p1", p1);
    }
```

Saída possível:
```
    1) t1 = {1, alpha, {1, 2, 3}}, t2 = {2, beta, {4, 5}}
    
    2) t1 = t2;
       t1 = {2, beta, {4, 5}}, t2 = {2, beta, {4, 5}}
    
    3) t1 = std::move(t2);
       t1 = {2, beta, {4, 5}}, t2 = {2, , {}}
    
    4) t1 = t3;
       t1 = {3, gamma, {6, 7, 8}}, t3 = {3, gamma, {6, 7, 8}}
    
    5) t1 = std::move(t3);
       t1 = {3, gamma, {6, 7, 8}}, t3 = {3, gamma, {}}
    
    6) t4 = {delta, {10, 11, 12}}, p1 = {epsilon, {14, 15, 16}}
    
    7) t4 = p1;
       t4 = {epsilon, {14, 15, 16}}, p1 = {epsilon, {14, 15, 16}}
    
    8) t4 = std::move(p1);
       t4 = {epsilon, {14, 15, 16}}, p1 = {epsilon, {}}
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2729](<https://cplusplus.github.io/LWG/issue2729>) | C++11 | operator= não era restrito e poderia resultar em comportamento indefinido desnecessário | restrito

### Veja também

[ (constructor)](<#/doc/utility/tuple/tuple>) | constrói uma nova `tuple`
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública de `std::pair<T1,T2>`)