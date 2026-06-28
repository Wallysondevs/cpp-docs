# std::shift_left, std::shift_right

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
constexpr ForwardIt shift_left( ForwardIt first, ForwardIt last,
typename std::iterator_traits<ForwardIt>::
difference_type n );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt shift_left( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
typename std::iterator_traits<ForwardIt>::
difference_type n );
template< class ForwardIt >
constexpr ForwardIt shift_right( ForwardIt first, ForwardIt last,
typename std::iterator_traits<ForwardIt>::
difference_type n );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt shift_right( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
typename std::iterator_traits<ForwardIt>::
difference_type n );
```

Desloca os elementos no range `[`first`, `last`)` por n posições.

1) Desloca os elementos em direção ao início do range.

  * Se n == 0 || n >= last - first, não há efeitos.
  * Caso contrário, para cada inteiro i em `[`​0​`, `last - first - n`)`, move o elemento originalmente na posição first + n + i para a posição first + i.

As movimentações são realizadas em ordem crescente de `i` começando de ​0​.

3) Desloca os elementos em direção ao final do range.

  * Se n == 0 || n >= last - first, não há efeitos.
  * Caso contrário, para cada inteiro i em `[`​0​`, `last - first - n`)`, move o elemento originalmente na posição first + i para a posição first + n + i.

Se `ForwardIt` atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), então as movimentações são realizadas em ordem decrescente de i começando de last - first - n - 1.

2,4) O mesmo que (1) e (3), respectivamente, mas executado de acordo com a policy e as movimentações podem ser realizadas em qualquer ordem.

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for true.

Elementos que estão no range original, mas não no novo range, são deixados em um estado válido, mas não especificado.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * n >= 0 não for verdadeiro.
  * O tipo de *first não for [MoveAssignable](<#/doc/named_req/MoveAssignable>).
  * Para `shift_right`, `ForwardIt` não for nem [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) nem [ValueSwappable](<#/doc/named_req/ValueSwappable>).

### Parâmetros

- **first** — o início do range original
- **last** — o final do range original
- **n** — o número de posições para deslocar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

1,2) O final do range resultante.

  * Se n for menor que [std::distance](<#/doc/iterator/distance>)(first, last), retorna um iterator igual a [std::next](<#/doc/iterator/next>)(first, ([std::distance](<#/doc/iterator/distance>)(first, last) - n)).
  * Caso contrário, retorna first.

3,4) O início do range resultante.

  * Se n for menor que [std::distance](<#/doc/iterator/distance>)(first, last), retorna um iterator igual a [std::next](<#/doc/iterator/next>)(first, n).
  * Caso contrário, retorna last.

### Complexidade

1,2) No máximo [std::distance](<#/doc/iterator/distance>)(first, last) - n atribuições.

3,4) No máximo [std::distance](<#/doc/iterator/distance>)(first, last) - n atribuições ou trocas.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_shift`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | [`std::shift_left`](<#/doc/algorithm/shift>) e [`std::shift_right`](<#/doc/algorithm/shift>)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <vector>
    
    struct S
    {
        int value{0};
        bool specified_state{true};
    
        S(int v = 0) : value{v} {}
        S(S const& rhs) = default;
        S(S&& rhs) { *this = std::move(rhs); }
        S& operator=(S const& rhs) = default;
        S& operator=(S&& rhs)
        {
            if (this != &rhs)
            {
                value = rhs.value;
                specified_state = rhs.specified_state;
                rhs.specified_state = false;
            }
            return *this;
        }
    };
    
    template<typename T>
    std::ostream& operator<<(std::ostream& os, std::vector<T> const& v)
    {
        for (const auto& s : v)
        {
            if constexpr (std::is_same_v<T, S>)
                s.specified_state ? os << s.value << ' ' : os << ". ";
            else if constexpr (std::is_same_v<T, std::string>)
                os << (s.empty() ? "." : s) << ' ';
            else
                os << s << ' ';
        }
        return os;
    }
    
    int main()
    {
        std::cout << std::left;
    
        std::vector<S>           a{1, 2, 3, 4, 5, 6, 7};
        std::vector<int>         b{1, 2, 3, 4, 5, 6, 7};
        std::vector<std::string> c{"α", "β", "γ", "δ", "ε", "ζ", "η"};
    
        std::cout << "vector<S> \tvector<int> \tvector<string>\n";
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::shift_left(begin(a), end(a), 3);
        std::shift_left(begin(b), end(b), 3);
        std::shift_left(begin(c), end(c), 3);
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::shift_right(begin(a), end(a), 2);
        std::shift_right(begin(b), end(b), 2);
        std::shift_right(begin(c), end(c), 2);
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::shift_left(begin(a), end(a), 8); // has no effect: n >= last - first
        std::shift_left(begin(b), end(b), 8); // ditto
        std::shift_left(begin(c), end(c), 8); // ditto
        std::cout << a << "  " << b << "  " << c << '\n';
    
    //  std::shift_left(begin(a), end(a), -3); // UB, e.g. segfault
    }
```

Saída possível:
```
    vector<S>       vector<int>     vector<string>
    1 2 3 4 5 6 7   1 2 3 4 5 6 7   α β γ δ ε ζ η
    4 5 6 7 . . .   4 5 6 7 5 6 7   δ ε ζ η . . .
    . . 4 5 6 7 .   4 5 4 5 6 7 5   . . δ ε ζ η .
    . . 4 5 6 7 .   4 5 4 5 6 7 5   . . δ ε ζ η .
```

### Ver também

[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(modelo de função)
[ move_backward](<#/doc/algorithm/move_backward>)(C++11) | move um range de elementos para um novo local em ordem inversa
(modelo de função)
[ rotate](<#/doc/algorithm/rotate>) | rotaciona a ordem dos elementos em um range
(modelo de função)
[ ranges::shift_leftranges::shift_right](<#/doc/algorithm/ranges/shift>)(C++23) | desloca elementos em um range
(objeto de função de algoritmo)