# std::copy, std::copy_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class OutputIt >
OutputIt copy( InputIt first, InputIt last,
OutputIt d_first );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
ForwardIt2 copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first );
template< class InputIt, class OutputIt, class UnaryPred >
OutputIt copy_if( InputIt first, InputIt last,
OutputIt d_first, UnaryPred pred );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class UnaryPred >
ForwardIt2 copy_if( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, UnaryPred pred );
```

  
Copia os elementos no range, definido por `[`first`, `last`)`, para outro range começando em d_first (range de destino da cópia).

1) Copia todos os elementos no range `[`first`, `last`)` começando de first e prosseguindo até last.

Se d_first estiver em `[`first`, `last`)`, o comportamento é indefinido. Neste caso, [std::copy_backward](<#/doc/algorithm/copy_backward>) pode ser usado em vez disso.

2) Copia os elementos, mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)  
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)  
  
Se `[`first`, `last`)` e o range de destino da cópia se sobrepõem, o comportamento é indefinido.

3) Copia apenas os elementos para os quais o predicado pred retorna true. Este algoritmo de cópia é estável: a ordem relativa dos elementos que são copiados é preservada.

Se `[`first`, `last`)` e o range de destino da cópia se sobrepõem, o comportamento é indefinido.

4) O mesmo que (3), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)  
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)  
  
### Parâmetros

first, last  |  \-  |  o range de elementos a copiar   
---|---|---
d_first  |  \-  |  o início do range de destino   
policy  |  \-  |  a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada   
pred  |  \-  |  predicado unário que retorna true para os elementos requeridos.   
A expressão pred(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de `VT&` não é permitido, nem `VT` a menos que para `VT` um move seja equivalente a uma cópia (desde C++11). ​   
Requisitos de tipo   
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).   
-`ForwardIt1, ForwardIt2` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
-`UnaryPred` deve atender aos requisitos de [Predicate](<#/doc/named_req/Predicate>).   
  
### Valor de retorno

Iterator de saída para o elemento no range de destino, um após o último elemento copiado. 

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last): 

1,2) Exatamente \\(\scriptsize N\\)N atribuições.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicado pred, e no máximo \\(\scriptsize N\\)N atribuições.

Para as sobrecargas com uma `ExecutionPolicy`, pode haver um custo de desempenho se o tipo de valor de `ForwardIt1` não for [MoveConstructible](<#/doc/named_req/MoveConstructible>). 

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma: 

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação. 
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada. 

### Possível implementação

[copy (1)](<#/doc/algorithm/copy>)  
---
```
    template<class InputIt, class OutputIt>
    OutputIt copy(InputIt first, InputIt last,
                  OutputIt d_first)
    {
        for (; first != last; (void)++first, (void)++d_first)
            *d_first = *first;
     
        return d_first;
    }
```
  
[copy_if (3)](<#/doc/algorithm/copy>)
```
    template<class InputIt, class OutputIt, class UnaryPred>
    OutputIt copy_if(InputIt first, InputIt last,
                     OutputIt d_first, UnaryPred pred)
    {
        for (; first != last; (void)++first)
            if (pred(*first))
            {
                *d_first = *first;
                (void)++d_first;
            }
     
        return d_first;
    }
```
  
### Notas

Na prática, as implementações de `std::copy` evitam múltiplas atribuições e usam funções de cópia em massa como [std::memmove](<#/doc/string/byte/memmove>) se o tipo de valor for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e os tipos de iterator satisfizerem [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>). 

Ao copiar ranges sobrepostos, `std::copy` é apropriado ao copiar para a esquerda (o início do range de destino está fora do range de origem), enquanto `std::copy_backward` é apropriado ao copiar para a direita (o final do range de destino está fora do range de origem). 

### Exemplo

O código a seguir usa `std::copy` tanto para copiar o conteúdo de um [std::vector](<#/doc/container/vector>) para outro quanto para exibir o [std::vector](<#/doc/container/vector>) resultante.

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
     
    int main()
    {
        std::vector<int> from_vector(10);
        std::iota(from_vector.begin(), from_vector.end(), 0);
     
        std::vector<int> to_vector;
        std::copy(from_vector.begin(), from_vector.end(),
                  std::back_inserter(to_vector));
    // or, alternatively,
    //  std::vector<int> to_vector(from_vector.size());
    //  std::copy(from_vector.begin(), from_vector.end(), to_vector.begin());
    // either way is equivalent to
    //  std::vector<int> to_vector = from_vector;
     
        std::cout << "to_vector contains: ";
     
        std::copy(to_vector.begin(), to_vector.end(),
                  std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
     
        std::cout << "odd numbers in to_vector are: ";
     
        std::copy_if(to_vector.begin(), to_vector.end(),
                     std::ostream_iterator<int>(std::cout, " "),
                      { return x % 2 != 0; });
        std::cout << '\n';
     
        std::cout << "to_vector contains these multiples of 3: ";
     
        to_vector.clear();
        std::copy_if(from_vector.begin(), from_vector.end(),
                     std::back_inserter(to_vector),
                      { return x % 3 == 0; });
     
        for (const int x : to_vector)
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Saída possível: 
```
    to_vector contains: 0 1 2 3 4 5 6 7 8 9
    odd numbers in to_vector are: 1 3 5 7 9
    to_vector contains these multiples of 3: 0 3 6 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2039](<https://cplusplus.github.io/LWG/issue2039>) | C++11  | o valor de retorno de `std::copy_if` não foi especificado  | especificado   
[LWG 2044](<https://cplusplus.github.io/LWG/issue2044>) | C++11  | a estabilidade de `std::copy_if` não foi definida  | definida   
  
### Veja também

[ copy_backward](<#/doc/algorithm/copy_backward>) |  copia um range de elementos em ordem inversa   
(modelo de função)  
[ reverse_copy](<#/doc/algorithm/reverse_copy>) |  cria uma cópia de um range que é invertido   
(modelo de função)  
[ copy_n](<#/doc/algorithm/copy_n>)(C++11) |  copia um número de elementos para um novo local   
(modelo de função)  
[ fill](<#/doc/algorithm/fill>) |  atribui por cópia o valor dado a cada elemento em um range   
(modelo de função)  
[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) |  copia um range de elementos omitindo aqueles que satisfazem critérios específicos   
(modelo de função)  
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) |  copia um range de elementos para um novo local  
(objeto de função de algoritmo)