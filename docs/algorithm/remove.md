# std::remove, std::remove_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
ForwardIt remove( ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr ForwardIt remove( ForwardIt first, ForwardIt last,
const T& value );
template< class ExecutionPolicy, class ForwardIt, class T >
ForwardIt remove( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ExecutionPolicy, class ForwardIt,
class T = typename std::iterator_traits
<ForwardIt>::value_type >
ForwardIt remove( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
template< class ForwardIt, class UnaryPred >
ForwardIt remove_if( ForwardIt first, ForwardIt last, UnaryPred p );
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
ForwardIt remove_if( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
```

Remove todos os elementos que satisfazem critérios específicos do range `[`first`, `last`)` e retorna um iterador past-the-end para o novo final do range.

1) Remove todos os elementos que são iguais a value (usando operator==).

3) Remove todos os elementos para os quais o predicado p retorna true.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for true. | (desde C++20)

Se o [tipo de valor](<#/doc/iterator>) de `ForwardIt` não for [CopyAssignable](<#/doc/named_req/CopyAssignable>), o comportamento é indefinido. | (até C++11)
---|---
Se o tipo de *first não for [MoveAssignable](<#/doc/named_req/MoveAssignable>), o comportamento é indefinido. | (desde C++11)

### Explicação

A remoção é feita deslocando os elementos no range de tal forma que os elementos que não devem ser removidos apareçam no início do range.

* O deslocamento é feito por [atribuição de cópia](<#/doc/language/as_operator>)(até C++11)[atribuição de movimento](<#/doc/language/move_operator>)(desde C++11).
* A operação de remoção é estável: a ordem relativa dos elementos que não devem ser removidos permanece a mesma.
* A sequência subjacente de `[`first`, `last`)` não é encurtada pela operação de remoção. Dado result como o iterador retornado:

* Todos os iteradores em `[`result`, `last`)` ainda são [desreferenciáveis](<#/doc/iterator>).

* Cada elemento de `[`result`, `last`)` tem um estado válido, mas não especificado, porque a atribuição de movimento pode eliminar elementos movendo-os de elementos que estavam originalmente nesse range.

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a serem processados
- **value** — o valor dos elementos a serem removidos
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true se o elemento deve ser removido.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `ForwardIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro VT& não é permitido, nem VT, a menos que para `VT` um movimento seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPredicate` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Iterador past-the-end para o novo range de valores (se este não for end, então ele aponta para um valor não especificado, e o mesmo acontece com iteradores para quaisquer valores entre este iterador e end).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N\\)N comparações usando operator==.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[remove (1)](<#/doc/algorithm/remove>)
---
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type>
    ForwardIt remove(ForwardIt first, ForwardIt last, const T& value)
    {
        first = std::find(first, last, value);
        if (first != last)
            for (ForwardIt i = first; ++i != last;)
                if (!(*i == value))
                    *first++ = std::move(*i);
        return first;
    }
```

[remove_if (3)](<#/doc/algorithm/remove>)
```cpp
    template<class ForwardIt, class UnaryPred>
    ForwardIt remove_if(ForwardIt first, ForwardIt last, UnaryPred p)
    {
        first = std::find_if(first, last, p);
        if (first != last)
            for (ForwardIt i = first; ++i != last;)
                if (!p(*i))
                    *first++ = std::move(*i);
        return first;
    }
```

### Observações

Uma chamada para `remove` é tipicamente seguida por uma chamada para a função membro `erase` de um container para realmente remover elementos do container. Essas duas invocações juntas constituem o chamado [idioma Erase-remove](<https://en.wikipedia.org/wiki/Erase-remove_idiom> "enwiki:Erase-remove idiom").

O mesmo efeito também pode ser alcançado pelas seguintes funções não-membro:

* [std::erase](<#/doc/container/vector/erase2>), que possui [sobrecargas](<#/doc/container>) para todos os containers de sequência padrão.
* [std::erase_if](<#/doc/container/vector/erase2>), que possui [sobrecargas](<#/doc/container>) para todos os containers padrão.

| (desde C++20)

As [funções membro](<#/doc/container>) de container com nomes semelhantes [`list::remove`](<#/doc/container/list/remove>), [`list::remove_if`](<#/doc/container/list/remove>), [`forward_list::remove`](<#/doc/container/forward_list/remove>) e [`forward_list::remove_if`](<#/doc/container/forward_list/remove>) apagam os elementos removidos.

Esses algoritmos não podem ser usados com containers associativos como [std::set](<#/doc/container/set>) e [std::map](<#/doc/container/map>) porque seus tipos de iteradores não desreferenciam para tipos [MoveAssignable](<#/doc/named_req/MoveAssignable>) (as chaves nesses containers não são modificáveis).

A standard library também define uma sobrecarga de [`std::remove`](<#/doc/io/c/remove>) em [`<cstdio>`](<#/doc/header/cstdio>), que recebe um const char* e é usada para apagar arquivos.

Como `std::remove` recebe value por referência, ele pode ter um comportamento inesperado se for uma referência a um elemento do range `[`first`, `last`)`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/remove>))

### Exemplo

O código a seguir remove todos os espaços de uma string deslocando todos os caracteres não-espaço para a esquerda e, em seguida, apagando o excesso. Este é um exemplo do [idioma Erase-remove](<https://en.wikipedia.org/wiki/Erase-remove_idiom> "enwiki:Erase-remove idiom").

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cctype>
    #include <complex>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        std::string str1{"Text with some   spaces"};
    
        auto noSpaceEnd = std::remove(str1.begin(), str1.end(), ' ');
    
        // The spaces are removed from the string only logically.
        // Note, we use view, the original string is still not shrunk:
        std::cout << std::string_view(str1.begin(), noSpaceEnd) 
                  << " size: " << str1.size() << '\n';
    
        str1.erase(noSpaceEnd, str1.end());
    
        // The spaces are removed from the string physically.
        std::cout << str1 << " size: " << str1.size() << '\n';
    
        std::string str2 = "Text\n with\tsome \t  whitespaces\n\n";
        str2.erase(std::remove_if(str2.begin(), 
                                  str2.end(),
                                   { return std::isspace(x); }),
                   str2.end());
        std::cout << str2 << '\n';
    
        std::vector<std::complex<double>> nums{{2, 2}, {1, 3}, {4, 8}};
        #ifdef __cpp_lib_algorithm_default_value_type
            nums.erase(std::remove(nums.begin(), nums.end(), {1, 3}), nums.end());
        #else
            nums.erase(std::remove(nums.begin(), nums.end(), std::complex<double>{1, 3}),
                       nums.end());
        #endif
        assert((nums == std::vector<std::complex<double>>{{2, 2}, {4, 8}}));
    }
```

Saída:
```
    Textwithsomespaces size: 23
    Textwithsomespaces size: 18
    Textwithsomewhitespaces
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido ser [EqualityComparable](<#/doc/named_req/EqualityComparable>), mas o tipo de valor de `ForwardIt` nem sempre é `T` | exigiu que o tipo de valor de `ForwardIt` fosse [CopyAssignable](<#/doc/named_req/CopyAssignable>) em vez disso

### Veja também

[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(modelo de função)
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)