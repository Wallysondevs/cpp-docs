# std::swap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)` | | (até C++11)

```c
Definido no cabeçalho `<utility>`
Definido no cabeçalho `<string_view>`
template< class T >
void swap( T& a, T& b );
(constexpr desde C++20)
template< class T2, std::size_t N >
void swap( T2 (&a)[N], T2 (&b)[N] );
(constexpr desde C++20)
```

Troca os valores fornecidos.

1) Troca os valores a e b. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; && [std::is_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;T&gt; for verdadeiro. | (desde C++17)

2) Troca os arrays a e b. Equivalente a [std::swap_ranges](<#/doc/algorithm/swap_ranges>)(a, a + N, b). Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T2&gt; for verdadeiro. | (desde C++17)

### Parâmetros

- **a, b** — os valores a serem trocados
Requisitos de tipo
-`T` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>) (até C++11) [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>) (desde C++11).
-`T2` deve satisfazer os requisitos de [Swappable](<#/doc/named_req/Swappable>).

### Valor de retorno

(nenhum)

### Exceções

1) (nenhum) | (até C++11)
```cpp
`noexcept` especificação: noexcept(
std::is_nothrow_move_constructible<T>::value &&
std::is_nothrow_move_assignable<T>::value
)  // (desde C++11)
```

2) [`noexcept`](<#/doc/language/noexcept_spec>) especificação: noexcept(noexcept(swap(*a, *b))) A busca pelo identificador `swap` na especificação de exceção encontra este template de função além de qualquer coisa encontrada pelas regras de busca usuais, tornando a especificação de exceção equivalente a [std::is_nothrow_swappable](<#/>) do C++17. | (desde C++11)
```cpp
(até C++17)
`noexcept` especificação: noexcept(std::is_nothrow_swappable_v<T2>)  // (desde C++17)
```

### Complexidade

1) Constante.

2) Linear em N.

### Especializações

`std::swap` pode ser [especializado no namespace std](<#/doc/language/extending_std>) para tipos definidos pelo programa, mas tais especializações não são encontradas por [ADL](<#/doc/language/adl>) (o namespace std não é o namespace associado para o tipo definido pelo programa). | (até C++20)

A maneira esperada de tornar um [tipo definido pelo programa](<#/doc/language/type-id>) swappable é fornecer uma função membro não-membro swap no mesmo namespace que o tipo: veja [Swappable](<#/doc/named_req/Swappable>) para detalhes.

As seguintes sobrecargas já são fornecidas pela standard library:

[ std::swap(std::pair)](<#/doc/utility/pair/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::tuple)](<#/doc/utility/tuple/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::shared_ptr)](<#/doc/memory/shared_ptr/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::weak_ptr)](<#/doc/memory/weak_ptr/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::unique_ptr)](<#/doc/memory/unique_ptr/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::function)](<#/doc/utility/functional/function/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_string)](<#/doc/string/basic_string/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::array)](<#/doc/container/array/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::deque)](<#/doc/container/deque/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::forward_list)](<#/doc/container/forward_list/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::list)](<#/doc/container/list/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::vector)](<#/doc/container/vector/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::map)](<#/doc/container/map/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::multimap)](<#/doc/container/multimap/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::set)](<#/doc/container/set/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::multiset)](<#/doc/container/multiset/swap2>) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::unordered_map)](<#/doc/container/unordered_map/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::unordered_multimap)](<#/doc/container/unordered_multimap/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::unordered_set)](<#/doc/container/unordered_set/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::unordered_multiset)](<#/doc/container/unordered_multiset/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::queue)](<#/doc/container/queue/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::priority_queue)](<#/doc/container/priority_queue/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::stack)](<#/doc/container/stack/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::valarray)](<#/doc/numeric/valarray/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_stringbuf)](<#/doc/io/basic_stringbuf/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_istringstream)](<#/doc/io/basic_istringstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_ostringstream)](<#/doc/io/basic_ostringstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_stringstream)](<#/doc/io/basic_stringstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_filebuf)](<#/doc/io/basic_filebuf/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_ifstream)](<#/doc/io/basic_ifstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_ofstream)](<#/doc/io/basic_ofstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_fstream)](<#/doc/io/basic_fstream/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_syncbuf)](<#/doc/io/basic_syncbuf/swap2>)(C++20) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_spanbuf)](<#/doc/io/basic_spanbuf/swap2>)(C++23) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_ispanstream)](<#/doc/io/basic_ispanstream/swap2>)(C++23) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_ospanstream)](<#/doc/io/basic_ospanstream/swap2>)(C++23) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_spanstream)](<#/doc/io/basic_spanstream/swap2>)(C++23) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_regex)](<#/doc/regex/basic_regex/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::match_results)](<#/doc/regex/match_results/swap2>)(C++11) | especializa o algoritmo `std::swap`
(template de função)
[ std::swap(std::thread)](<#/doc/thread/thread/swap2>)(C++11) | especializa o algoritmo **std::swap**
(função)
[ std::swap(std::unique_lock)](<#/doc/thread/unique_lock/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::shared_lock)](<#/doc/thread/shared_lock/swap2>)(C++14) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::promise)](<#/doc/thread/promise/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::packaged_task)](<#/doc/thread/packaged_task/swap2>)(C++11) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::optional)](<#/doc/utility/optional/swap2>)(C++17) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::any)](<#/doc/utility/any/swap2>)(C++17) | especializa o algoritmo **std::swap**
(função)
[ std::swap(std::variant)](<#/doc/utility/variant/swap2>)(C++17) | especializa o algoritmo **std::swap**
(template de função)
[ std::swap(std::basic_stacktrace)](<#/doc/utility/basic_stacktrace/swap2>)(C++23) | especializa o algoritmo **std::swap**
(template de função)
[ swap(std::filesystem::path)](<#/doc/filesystem/path/swap2>)(C++17) | especializa o algoritmo **std::swap**
(função)
[ swap(std::expected)](<#/doc/utility/expected/swap2>)(C++23) | especializa o algoritmo **std::swap**
(função)
[ swap(std::jthread)](<#/doc/thread/jthread/swap2>)(C++20) | especializa o algoritmo **std::swap**
(função)
[ swap(std::move_only_function)](<#/doc/utility/functional/move_only_function/swap2>)(C++23) | especializa o algoritmo **std::swap**
(função)
[ swap(std::stop_source)](<#/doc/thread/stop_source/swap2>)(C++20) | especializa o algoritmo **std::swap**
(função)
[ swap(std::stop_token)](<#/doc/thread/stop_token/swap2>)(C++20) | especializa o algoritmo **std::swap**
(função)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    
    namespace Ns
    {
        class A
        {
            int id {};
    
            friend void swap(A& lhs, A& rhs)
            {
                std::cout << "swap(" << lhs << ", " << rhs << ")\n";
                std::swap(lhs.id, rhs.id);
            }
    
            friend std::ostream& operator<<(std::ostream& os, A const& a)
            {
                return os << "A::id=" << a.id;
            }
    
        public:
            A(int i) : id {i} {}
            A(A const&) = delete;
            A& operator = (A const&) = delete;
        };
    }
    
    int main()
    {
        int a = 5, b = 3;
        std::cout << a << ' ' << b << '\n';
        std::swap(a, b);
        std::cout << a << ' ' << b << '\n';
    
        Ns::A p {6}, q {9};
        std::cout << p << ' ' << q << '\n';
    //  std::swap(p, q); // error, type requirements are not satisfied
        swap(p, q);      // OK, ADL finds the appropriate friend `swap`
        std::cout << p << ' ' << q << '\n';
    }
```

Saída:
```
    5 3
    3 5
    A::id=6 A::id=9
    swap(A::id=6, A::id=9)
    A::id=9 A::id=6
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 227](<https://cplusplus.github.io/LWG/issue227>) | C++98 | `T` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) ou [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
(um objeto temporário do tipo `T` pode não ser capaz de ser construído) | `T` também é exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
[LWG 809](<https://cplusplus.github.io/LWG/issue809>) | C++98 | arrays não podiam ser trocados | sobrecarga (2) adicionada
[LWG 2554](<https://cplusplus.github.io/LWG/issue2554>) | C++11 | a troca de arrays multidimensionais nunca pode ser noexcept devido a problemas de busca de nome | feito para funcionar

### Veja também

[ ranges::swap](<#/doc/utility/ranges/swap>)(C++20) | troca os valores de dois objetos
(objeto de ponto de customização)
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators
(template de função)
[ swap_ranges](<#/doc/algorithm/swap_ranges>) | troca dois ranges de elementos
(template de função)
[ exchange](<#/doc/utility/exchange>)(C++14) | substitui o argumento por um novo valor e retorna seu valor anterior
(template de função)