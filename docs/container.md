# Biblioteca de Containers

A biblioteca de Containers é uma coleção genérica de class templates e algoritmos que permitem aos programadores implementar facilmente estruturas de dados comuns como filas, listas e pilhas. Existem duas (até C++11) três (desde C++11) classes de containers:

  * containers de sequência,
  * containers associativos,

  * containers associativos não ordenados,

| (desde C++11)
  
cada um dos quais projetado para suportar um conjunto diferente de operações.

O container gerencia o espaço de armazenamento alocado para seus elementos e fornece funções membro para acessá-los, seja diretamente ou através de iterators (objetos com propriedades semelhantes a ponteiros).

A maioria dos containers possui pelo menos várias funções membro em comum e compartilha funcionalidades. Qual container é o melhor para uma aplicação particular depende não apenas da funcionalidade oferecida, mas também de sua eficiência para diferentes cargas de trabalho.

### Containers de sequência

Containers de sequência implementam estruturas de dados que podem ser acessadas sequencialmente.

[ array](<#/doc/container/array>)(C++11) | array contíguo in-place de tamanho fixo
(class template)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(class template)
[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo in-place, redimensionável dinamicamente, com capacidade fixa
(class template)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(class template)
[ forward_list](<#/doc/container/forward_list>)(C++11) | lista simplesmente encadeada
(class template)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(class template)
  
### Containers associativos

Containers associativos implementam estruturas de dados ordenadas que podem ser rapidamente pesquisadas (complexidade O(log n)).

[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(class template)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(class template)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(class template)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(class template)
  
### Containers associativos não ordenados (desde C++11)

Containers associativos não ordenados implementam estruturas de dados não ordenadas (com hash) que podem ser rapidamente pesquisadas (complexidade O(1) em média, O(n) no pior caso).

[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, com hash por chaves
(class template)
[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, com hash por chaves, chaves são únicas
(class template)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, com hash por chaves
(class template)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, com hash por chaves
(class template)
  
### Adaptadores de container

Adaptadores de container fornecem uma interface diferente para containers sequenciais.

[ stack](<#/doc/container/stack>) | adapta um container para fornecer uma pilha (estrutura de dados LIFO)
(class template)
[ queue](<#/doc/container/queue>) | adapta um container para fornecer uma fila (estrutura de dados FIFO)
(class template)
[ priority_queue](<#/doc/container/priority_queue>) | adapta um container para fornecer uma fila de prioridade
(class template)
[ flat_set](<#/doc/container/flat_set>)(C++23) | adapta um container para fornecer uma coleção de chaves únicas, ordenadas por chaves
(class template)
[ flat_map](<#/doc/container/flat_map>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves únicas
(class template)
[ flat_multiset](<#/doc/container/flat_multiset>)(C++23) | adapta um container para fornecer uma coleção de chaves, ordenadas por chaves
(class template)
[ flat_multimap](<#/doc/container/flat_multimap>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves
(class template)
  
### Views (desde C++20)

Views fornecem facilidades flexíveis para interagir com views unidimensionais ou multidimensionais sobre um array de elementos não proprietário.

[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(class template)
[ mdspan](<#/doc/container/mdspan>)(C++23) | uma view de array multidimensional não proprietária
(class template)
  
### Invalidação de iterator

Métodos somente leitura nunca [invalidam](<#/doc/iterator>) iterators ou referências. Métodos que modificam o conteúdo de um container podem invalidar iterators e/ou referências, conforme resumido nesta tabela.

Categoria | Container | Após **inserção** , são... | Após **remoção** , são... | Condicionalmente
**iterators** válidos? | **referências** válidas? | **iterators** válidos? | **referências** válidas?
Containers de sequência | [`array`](<#/doc/container/array>) | N/A | N/A |
[`vector`](<#/doc/container/vector>) | Não | N/A | Inserção alterou a capacidade
Sim | Sim | Antes do(s) elemento(s) modificado(s)
(para inserção somente se a capacidade não mudou) | Não | Não | No(s) ou após o(s) elemento(s) modificado(s)
[`deque`](<#/doc/container/deque>) | Não | Sim | Sim, exceto o(s) elemento(s) removido(s) | Primeiro ou último elemento modificado
Não | Não | Somente o meio modificado
[`list`](<#/doc/container/list>) | Sim | Sim, exceto o(s) elemento(s) removido(s) |
[`forward_list`](<#/doc/container/forward_list>) | Sim | Sim, exceto o(s) elemento(s) removido(s) |
Containers associativos | [`set`](<#/doc/container/set>)
[`multiset`](<#/doc/container/multiset>)
[`map`](<#/doc/container/map>)
[`multimap`](<#/doc/container/multimap>) | Sim | Sim, exceto o(s) elemento(s) removido(s) |
Containers associativos não ordenados | [`unordered_set`](<#/doc/container/unordered_set>)
[`unordered_multiset`](<#/doc/container/unordered_multiset>)
[`unordered_map`](<#/doc/container/unordered_map>)
[`unordered_multimap`](<#/doc/container/unordered_multimap>) | Não | Sim | N/A | Inserção causou rehash
---|---
Sim | Sim, exceto o(s) elemento(s) removido(s) | Sem rehash
| Esta seção está incompleta
Razão: adicionar invalidação de iterator para adaptadores "flat" do C++23 (std::flat_set etc) |
| Esta seção está incompleta
Razão: adicionar invalidação de iterator para std::inplace_vector do C++26
  
Aqui, **inserção** refere-se a qualquer método que adiciona um ou mais elementos ao container e **remoção** refere-se a qualquer método que remove um ou mais elementos do container.

  * Exemplos de métodos de inserção são [std::set::insert](<#/doc/container/set/insert>), [std::map::emplace](<#/doc/container/map/emplace>), [std::vector::push_back](<#/doc/container/vector/push_back>), e [std::deque::push_front](<#/doc/container/deque/push_front>).

    

  * Note que [std::unordered_map::operator[]](<#/doc/container/unordered_map/operator_at>) também conta, pois pode inserir um elemento no map.

| (desde C++11)
  
  * Exemplos de métodos de remoção são [std::set::erase](<#/doc/container/set/erase>), [std::vector::pop_back](<#/doc/container/vector/pop_back>), [std::deque::pop_front](<#/doc/container/deque/pop_front>), e [std::map::clear](<#/doc/container/map/clear>).
    * `clear` invalida todos os iterators e referências. Como ele remove todos os elementos, isso tecnicamente está em conformidade com as regras acima.

A menos que especificado de outra forma (explicitamente ou definindo uma função em termos de outras funções), passar um container como argumento para uma função de biblioteca nunca invalida iterators para, ou altera os valores de, objetos dentro desse container.

O iterator past-the-end merece menção particular. Em geral, este iterator é invalidado como se fosse um iterator normal para um elemento não removido. Assim, [std::set::end](<#/doc/container/set/end>) nunca é invalidado, [std::unordered_set::end](<#/doc/container/unordered_set/end>) é invalidado apenas em rehash (desde C++11), [std::vector::end](<#/doc/container/vector/end>) é sempre invalidado (já que está sempre após os elementos modificados), e assim por diante.

Há uma exceção: uma remoção que apaga o último elemento de um [std::deque](<#/doc/container/deque>) _invalida_ o iterator past-the-end, mesmo que não seja um elemento removido do container (ou um elemento de forma alguma). Combinado com as regras gerais para iterators de [std::deque](<#/doc/container/deque>), o resultado líquido é que a única operação de modificação que _não_ invalida [std::deque::end](<#/doc/container/deque/end>) é uma remoção que apaga o primeiro elemento, mas não o último.

### Segurança de thread

  1. Todas as funções de container podem ser chamadas concorrentemente por diferentes threads em diferentes containers. Mais geralmente, as funções da standard library C++ não leem objetos acessíveis por outras threads, a menos que esses objetos sejam direta ou indiretamente acessíveis via os argumentos da função, incluindo o ponteiro `this`.
  2. Todas as funções membro `const` podem ser chamadas concorrentemente por diferentes threads no mesmo container. Além disso, as funções membro `begin()`, `end()`, `rbegin()`, `rend()`, `front()`, `back()`, `data()`, `find()`, `lower_bound()`, `upper_bound()`, `equal_range()`, `at()`, e, exceto em containers associativos, `operator[]`, comportam-se como `const` para fins de segurança de thread (ou seja, elas também podem ser chamadas concorrentemente por diferentes threads no mesmo container). Mais geralmente, as funções da standard library C++ não modificam objetos, a menos que esses objetos sejam acessíveis, direta ou indiretamente, via os argumentos não-`const` da função, incluindo o ponteiro `this`.
  3. Diferentes elementos no mesmo container podem ser modificados concorrentemente por diferentes threads, exceto para os elementos de `std::vector<bool>` (por exemplo, um vector de objetos [std::future](<#/doc/thread/future>) pode estar recebendo valores de múltiplas threads).
  4. Operações de iterator (por exemplo, incrementar um iterator) leem, mas não modificam o container subjacente, e podem ser executadas concorrentemente com operações em outros iterators no mesmo container, com as funções membro `const`, ou leituras dos elementos. Operações de container que invalidam quaisquer iterators modificam o container e não podem ser executadas concorrentemente com quaisquer operações em iterators existentes, mesmo que esses iterators não sejam invalidados.
  5. Elementos do mesmo container podem ser modificados concorrentemente com aquelas funções membro que não são especificadas para acessar esses elementos. Mais geralmente, as funções da standard library C++ não leem objetos indiretamente acessíveis através de seus argumentos (incluindo outros elementos de um container), exceto quando exigido por sua especificação.
  6. Em qualquer caso, operações de container (assim como algoritmos, ou quaisquer outras funções da standard library C++) podem ser paralelizadas internamente, desde que isso não altere os resultados visíveis ao usuário (por exemplo, [std::transform](<#/doc/algorithm/transform>) pode ser paralelizado, mas não [std::for_each](<#/doc/algorithm/for_each>) que é especificado para visitar cada elemento de uma sequência em ordem).

| (desde C++11)
  
### Tabela de funções

Nota: [std::basic_string](<#/doc/string/basic_string>) não é tratado como um container pelo padrão, mas se comporta muito como um devido à sua similaridade. Ele é listado como 'Pseudo container' aqui por conveniência.

| \- funções presentes no C++03
---|---
| \- funções presentes desde C++11
| \- funções presentes desde C++17
| \- funções presentes desde C++20
| \- funções presentes desde C++23
| Esta seção está incompleta
Razão: Adicionar "cor" C++26 e preencher a tabela de funções membro/não-membro para std::inplace_vector
  
#### Tabela de funções membro

```text
| Pseudo container | Containers de sequência | Containers associativos | Containers associativos não ordenados | Adaptadores de container |
Header | ``&lt;string&gt;`` | ``&lt;array&gt;`` | ``&lt;vector&gt;`` | ``&lt;deque&gt;`` | ``<forward_list>`` | ``&lt;list&gt;`` | ``&lt;set&gt;`` | ``&lt;map&gt;`` | ``<unordered_set>`` | ``<unordered_map>`` | ``&lt;stack&gt;`` | ``&lt;queue&gt;`` | ``<flat_set>`` | ``<flat_map>`` | Header
Container | [ | `basic_string`
--- ](<#/doc/string/basic_string>) [ | `array`
--- ](<#/doc/container/array>) [ | `vector`
--- ](<#/doc/container/vector>) [ | `deque`
--- ](<#/doc/container/deque>) [ | `forward_list`
--- ](<#/doc/container/forward_list>) [ | `list`
--- ](<#/doc/container/list>) [ | `set`
--- ](<#/doc/container/set>) [ | `multiset`
--- ](<#/doc/container/multiset>) [ | `map`
--- ](<#/doc/container/map>) [ | `multimap`
--- ](<#/doc/container/multimap>) [ | `unordered_set`
--- ](<#/doc/container/unordered_set>) [ | `unordered_multiset`
--- ](<#/doc/container/unordered_multiset>) [ | `unordered_map`
--- ](<#/doc/container/unordered_map>) [ | `unordered_multimap`
--- ](<#/doc/container/unordered_multimap>) [ | `stack`
--- ](<#/doc/container/stack>) [ | `queue`
--- ](<#/doc/container/queue>) [ | `priority_queue`
--- ](<#/doc/container/priority_queue>) [ | `flat_set`
--- ](<#/doc/container/flat_set>) [ | `flat_multiset`
--- ](<#/doc/container/flat_multiset>) [ | `flat_map`
--- ](<#/doc/container/flat_map>) [ | `flat_multimap`
--- ](<#/doc/container/flat_multimap>) Container
| | `(construtor)`
---
  
[ | `basic_string`
--- ](<#/doc/string/basic_string/basic_string>) (implícito) | [ | `vector`
--- ](<#/doc/container/vector/vector>) [ | `deque`
--- ](<#/doc/container/deque/deque>) [ | `forward_list`
--- ](<#/doc/container/forward_list/forward_list>) [ | `list`
--- ](<#/doc/container/list/list>) [ | `set`
--- ](<#/doc/container/set/set>) [ | `multiset`
--- ](<#/doc/container/multiset/multiset>) [ | `map`
--- ](<#/doc/container/map/map>) [ | `multimap`
--- ](<#/doc/container/multimap/multimap>) [ | `unordered_set`
--- ](<#/doc/container/unordered_set/unordered_set>) [ | `unordered_multiset`
--- ](<#/doc/container/unordered_multiset/unordered_multiset>) [ | `unordered_map`
--- ](<#/doc/container/unordered_map/unordered_map>) [ | `unordered_multimap`
--- ](<#/doc/container/unordered_multimap/unordered_multimap>) [ | `stack`
--- ](<#/doc/container/stack/stack>) [ | `queue`
--- ](<#/doc/container/queue/queue>) [ | `priority_queue`
--- ](<#/doc/container/priority_queue/priority_queue>) [ | `flat_set`
--- ](<#/doc/container/flat_set/flat_set>) [ | `flat_multiset`
--- ](<#/doc/container/flat_multiset/flat_multiset>) [ | `flat_map`
--- ](<#/doc/container/flat_map/flat_map>) [ | `flat_multimap`
--- ](<#/doc/container/flat_multimap/flat_multimap>) | `(construtor)`
---
  
| `(destrutor)`
---
  
[ | `~basic_string`
--- ](<#/doc/string/basic_string/~basic_string>) (implícito) | [ | `~vector`
--- ](<#/doc/container/vector/~vector>) [ | `~deque`
--- ](<#/doc/container/deque/~deque>) [ | `~forward_list`
--- ](<#/doc/container/forward_list/~forward_list>) [ | `~list`
--- ](<#/doc/container/list/~list>) [ | `~set`
--- ](<#/doc/container/set/~set>) [ | `~multiset`
--- ](<#/doc/container/multiset/~multiset>) [ | `~map`
--- ](<#/doc/container/map/~map>) [ | `~multimap`
--- ](<#/doc/container/multimap/~multimap>) [ | `~unordered_set`
--- ](<#/doc/container/unordered_set/~unordered_set>) [ | `~unordered_multiset`
--- ](<#/doc/container/unordered_multiset/~unordered_multiset>) [ | `~unordered_map`
--- ](<#/doc/container/unordered_map/~unordered_map>) [ | `~unordered_multimap`
--- ](<#/doc/container/unordered_multimap/~unordered_multimap>) [ | `~stack`
--- ](<#/doc/container/stack/~stack>) [ | `~queue`
--- ](<#/doc/container/queue/~queue>) [ | `~priority_queue`
--- ](<#/doc/container/priority_queue/~priority_queue>) [ | `~flat_set`
--- ](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/flat_set/%7Eflat_set&action=edit&redlink=1> "cpp/container/flat set/~flat set (página não existe)") [ | `~flat_multiset`
--- ](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/flat_multiset/%7Eflat_multiset&action=edit&redlink=1> "cpp/container/flat multiset/~flat multiset (página não existe)") [ | `~flat_map`
--- ](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/flat_map/%7Eflat_map&action=edit&redlink=1> "cpp/container/flat map/~flat map (página não existe)") [ | `~flat_multimap`
--- ](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/flat_multimap/%7Eflat_multimap&action=edit&redlink=1> "cpp/container/flat multimap/~flat multimap (página não existe)") | `(destrutor)`
---
  
| `operator=`
---
  
[ | `operator=`
--- ](<#/>) (implícito) | [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) [ | `operator=`
--- ](<#/>) | `operator=`
---
  
| `assign`
---
  
[ | `assign`
--- ](<#/doc/string/basic_string/assign>) | [ | `assign`
--- ](<#/doc/container/vector/assign>) [ | `assign`
--- ](<#/doc/container/deque/assign>) [ | `assign`
--- ](<#/doc/container/forward_list/assign>) [ | `assign`
--- ](<#/doc/container/list/assign>) | | | | | | | | | | | | | | | | `assign`
---
  
| `assign_range`
---
  
[ | `assign_range`
--- ](<#/doc/string/basic_string/assign_range>) | [ | `assign_range`
--- ](<#/doc/container/vector/assign_range>) [ | `assign_range`
--- ](<#/doc/container/deque/assign_range>) [ | `assign_range`
--- ](<#/doc/container/forward_list/assign_range>) [ | `assign_range`
--- ](<#/doc/container/list/assign_range>) | | | | | | | | | | | | | | | | `assign_range`
---
  
Iterators | | `begin`
---
`cbegin`
[ | `begin`
---
`cbegin` ](<#/doc/string/basic_string/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/array/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/vector/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/deque/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/forward_list/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/list/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/set/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/multiset/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/map/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/multimap/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/unordered_set/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/unordered_multiset/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/unordered_map/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/unordered_multimap/begin>) | | | [ | `begin`
---
`cbegin` ](<#/doc/container/flat_set/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/flat_multiset/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/flat_map/begin>) [ | `begin`
---
`cbegin` ](<#/doc/container/flat_multimap/begin>) | `begin`
---
`cbegin`
Iterators
| `end`
---
`cend`
[ | `end`
---
`cend` ](<#/doc/string/basic_string/end>) [ | `end`
---
`cend` ](<#/doc/container/array/end>) [ | `end`
---
`cend` ](<#/doc/container/vector/end>) [ | `end`
---
`cend` ](<#/doc/container/deque/end>) [ | `end`
---
`cend` ](<#/doc/container/forward_list/end>) [ | `end`
---
`cend` ](<#/doc/container/list/end>) [ | `end`
---
`cend` ](<#/doc/container/set/end>) [ | `end`
---
`cend` ](<#/doc/container/multiset/end>) [ | `end`
---
`cend` ](<#/doc/container/map/end>) [ | `end`
---
`cend` ](<#/doc/container/multimap/end>) [ | `end`
---
`cend` ](<#/doc/container/unordered_set/end>) [ | `end`
---
`cend` ](<#/doc/container/unordered_multiset/end>) [ | `end`
---
`cend` ](<#/doc/container/unordered_map/end>) [ | `end`
---
`cend` ](<#/doc/container/unordered_multimap/end>) | | | [ | `end`
---
`cend` ](<#/doc/container/flat_set/end>) [ | `end`
---
`cend` ](<#/doc/container/flat_multiset/end>) [ | `end`
---
`cend` ](<#/doc/container/flat_map/end>) [ | `end`
---
`cend` ](<#/doc/container/flat_multimap/end>) | `end`
---
`cend`
| `rbegin`
---
`crbegin`
[ | `rbegin`
---
`crbegin` ](<#/doc/string/basic_string/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/array/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/vector/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/deque/rbegin>) | [ | `rbegin`
---
`crbegin` ](<#/doc/container/list/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/set/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/multiset/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/map/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/multimap/rbegin>) | | | | | | | [ | `rbegin`
---
`crbegin` ](<#/doc/container/flat_set/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/flat_multiset/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/flat_map/rbegin>) [ | `rbegin`
---
`crbegin` ](<#/doc/container/flat_multimap/rbegin>) | `rbegin`
---
`crbegin`
| `rend`
---
`crend`
[ | `rend`
---
`crend` ](<#/doc/string/basic_string/rend>) [ | `rend`
---
`crend` ](<#/doc/container/array/rend>) [ | `rend`
---
`crend` ](<#/doc/container/vector/rend>) [ | `rend`
---
`crend` ](<#/doc/container/deque/rend>) | [ | `rend`
---
`crend` ](<#/doc/container/list/rend>) [ | `rend`
---
`crend` ](<#/doc/container/set/rend>) [ | `rend`
---
`crend` ](<#/doc/container/multiset/rend>) [ | `rend`
---
`crend` ](<#/doc/container/map/rend>) [ | `rend`
---
`crend` ](<#/doc/container/multimap/rend>) | | | | | | | [ | `rend`
---
`crend` ](<#/doc/container/flat_set/rend>) [ | `rend`
---
`crend` ](<#/doc/container/flat_multiset/rend>) [ | `rend`
---
`crend` ](<#/doc/container/flat_map/rend>) [ | `rend`
---
`crend` ](<#/doc/container/flat_multimap/rend>) | `rend`
---
`crend`
Acesso a elemento | | `at`
---
  
[ | `at`
--- ](<#/doc/string/basic_string/at>) [ | `at`
--- ](<#/doc/container/array/at>) [ | `at`
--- ](<#/doc/container/vector/at>) [ | `at`
--- ](<#/doc/container/deque/at>) | | | | [ | `at`
--- ](<#/doc/container/map/at>) | | | [ | `at`
--- ](<#/doc/container/unordered_map/at>) | | | | | | [ | `at`
--- ](<#/doc/container/flat_map/at>) | | `at`
---
  
Acesso a elemento | `operator[]`
---
  
[ | `operator[]`
--- ](<#/doc/string/basic_string/operator_at>) [ | `operator[]`
--- ](<#/doc/container/array/operator_at>) [ | `operator[]`
--- ](<#/doc/container/vector/operator_at>) [ | `operator[]`
--- ](<#/doc/container/deque/operator_at>) | | | | [ | `operator[]`
--- ](<#/doc/container/map/operator_at>) | | | [ | `operator[]`
--- ](<#/doc/container/unordered_map/operator_at>) | | | | | | [ | `operator[]`
--- ](<#/doc/container/flat_map/operator_at>) | | `operator[]`
---
  
| `data`
---
  
[ | `data`
--- ](<#/doc/string/basic_string/data>) [ | `data`
--- ](<#/doc/container/array/data>) [ | `data`
--- ](<#/doc/container/vector/data>) | | | | | | | | | | | | | | | | | | | `data`
---
  
| `front`
---
  
[ | `front`
--- ](<#/doc/string/basic_string/front>) [ | `front`
--- ](<#/doc/container/array/front>) [ | `front`
--- ](<#/doc/container/vector/front>) [ | `front`
--- ](<#/doc/container/deque/front>) [ | `front`
--- ](<#/doc/container/forward_list/front>) [ | `front`
--- ](<#/doc/container/list/front>) | | | | | | | | | [ | `front`
--- ](<#/doc/container/queue/front>) [ | `top`
--- ](<#/doc/container/priority_queue/top>) | | | | | | `front`
---
  
| `back`
---
  
[ | `back`
--- ](<#/doc/string/basic_string/back>)
--- ](<#/doc/container/array/back>) [ | `back`  
--- ](<#/doc/container/vector/back>) [ | `back`  
--- ](<#/doc/container/deque/back>) | [ | `back`  
--- ](<#/doc/container/list/back>) |  |  |  |  |  |  |  | [ | `top`  
--- ](<#/doc/container/stack/top>) [ | `back`  
--- ](<#/doc/container/queue/back>) |  |  |  |  |  | `back`  
---  
  
Capacidade  |  | `empty`  
---  
  
[ | `empty`  
--- ](<#/doc/string/basic_string/empty>) [ | `empty`  
--- ](<#/doc/container/array/empty>) [ | `empty`  
--- ](<#/doc/container/vector/empty>) [ | `empty`  
--- ](<#/doc/container/deque/empty>) [ | `empty`  
--- ](<#/doc/container/forward_list/empty>) [ | `empty`  
--- ](<#/doc/container/list/empty>) [ | `empty`  
--- ](<#/doc/container/set/empty>) [ | `empty`  
--- ](<#/doc/container/multiset/empty>) [ | `empty`  
--- ](<#/doc/container/map/empty>) [ | `empty`  
--- ](<#/doc/container/multimap/empty>) [ | `empty`  
--- ](<#/doc/container/unordered_set/empty>) [ | `empty`  
--- ](<#/doc/container/unordered_multiset/empty>) [ | `empty`  
--- ](<#/doc/container/unordered_map/empty>) [ | `empty`  
--- ](<#/doc/container/unordered_multimap/empty>) [ | `empty`  
--- ](<#/doc/container/stack/empty>) [ | `empty`  
--- ](<#/doc/container/queue/empty>) [ | `empty`  
--- ](<#/doc/container/priority_queue/empty>) [ | `empty`  
--- ](<#/doc/container/flat_set/empty>) [ | `empty`  
--- ](<#/doc/container/flat_multiset/empty>) [ | `empty`  
--- ](<#/doc/container/flat_map/empty>) [ | `empty`  
--- ](<#/doc/container/flat_multimap/empty>) | `empty`  
---  
  
Capacidade   
| `size`  
---  
  
[ | `size`  
--- ](<#/doc/string/basic_string/size>) [ | `size`  
--- ](<#/doc/container/array/size>) [ | `size`  
--- ](<#/doc/container/vector/size>) [ | `size`  
--- ](<#/doc/container/deque/size>) | [ | `size`  
--- ](<#/doc/container/list/size>) [ | `size`  
--- ](<#/doc/container/set/size>) [ | `size`  
--- ](<#/doc/container/multiset/size>) [ | `size`  
--- ](<#/doc/container/map/size>) [ | `size`  
--- ](<#/doc/container/multimap/size>) [ | `size`  
--- ](<#/doc/container/unordered_set/size>) [ | `size`  
--- ](<#/doc/container/unordered_multiset/size>) [ | `size`  
--- ](<#/doc/container/unordered_map/size>) [ | `size`  
--- ](<#/doc/container/unordered_multimap/size>) [ | `size`  
--- ](<#/doc/container/stack/size>) [ | `size`  
--- ](<#/doc/container/queue/size>) [ | `size`  
--- ](<#/doc/container/priority_queue/size>) [ | `size`  
--- ](<#/doc/container/flat_set/size>) [ | `size`  
--- ](<#/doc/container/flat_multiset/size>) [ | `size`  
--- ](<#/doc/container/flat_map/size>) [ | `size`  
--- ](<#/doc/container/flat_multimap/size>) | `size`  
---  
  
| `max_size`  
---  
  
[ | `max_size`  
--- ](<#/doc/string/basic_string/max_size>) [ | `max_size`  
--- ](<#/doc/container/array/max_size>) [ | `max_size`  
--- ](<#/doc/container/vector/max_size>) [ | `max_size`  
--- ](<#/doc/container/deque/max_size>) [ | `max_size`  
--- ](<#/doc/container/forward_list/max_size>) [ | `max_size`  
--- ](<#/doc/container/list/max_size>) [ | `max_size`  
--- ](<#/doc/container/set/max_size>) [ | `max_size`  
--- ](<#/doc/container/multiset/max_size>) [ | `max_size`  
--- ](<#/doc/container/map/max_size>) [ | `max_size`  
--- ](<#/doc/container/multimap/max_size>) [ | `max_size`  
--- ](<#/doc/container/unordered_set/max_size>) [ | `max_size`  
--- ](<#/doc/container/unordered_multiset/max_size>) [ | `max_size`  
--- ](<#/doc/container/unordered_map/max_size>) [ | `max_size`  
--- ](<#/doc/container/unordered_multimap/max_size>) |  |  | [ | `max_size`  
--- ](<#/doc/container/flat_set/max_size>) [ | `max_size`  
--- ](<#/doc/container/flat_multiset/max_size>) [ | `max_size`  
--- ](<#/doc/container/flat_map/max_size>) [ | `max_size`  
--- ](<#/doc/container/flat_multimap/max_size>) | `max_size`  
---  
  
| `resize`  
---  
  
[ | `resize`  
--- ](<#/doc/string/basic_string/resize>) | [ | `resize`  
--- ](<#/doc/container/vector/resize>) [ | `resize`  
--- ](<#/doc/container/deque/resize>) [ | `resize`  
--- ](<#/doc/container/forward_list/resize>) [ | `resize`  
--- ](<#/doc/container/list/resize>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `resize`  
---  
  
| `capacity`  
---  
  
[ | `capacity`  
--- ](<#/doc/string/basic_string/capacity>) | [ | `capacity`  
--- ](<#/doc/container/vector/capacity>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `capacity`  
---  
  
| `reserve`  
---  
  
[ | `reserve`  
--- ](<#/doc/string/basic_string/reserve>) | [ | `reserve`  
--- ](<#/doc/container/vector/reserve>) |  |  |  |  |  |  | [ | `reserve`  
--- ](<#/doc/container/unordered_set/reserve>) [ | `reserve`  
--- ](<#/doc/container/unordered_multiset/reserve>) [ | `reserve`  
--- ](<#/doc/container/unordered_map/reserve>) [ | `reserve`  
--- ](<#/doc/container/unordered_multimap/reserve>) |  |  |  |  |  |  |  | `reserve`  
---  
  
| `shrink_to_fit`  
---  
  
[ | `shrink_to_fit`  
--- ](<#/doc/string/basic_string/shrink_to_fit>) | [ | `shrink_to_fit`  
--- ](<#/doc/container/vector/shrink_to_fit>) [ | `shrink_to_fit`  
--- ](<#/doc/container/deque/shrink_to_fit>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `shrink_to_fit`  
---  
  
Modificadores  |  | `clear`  
---  
  
[ | `clear`  
--- ](<#/doc/string/basic_string/clear>) | [ | `clear`  
--- ](<#/doc/container/vector/clear>) [ | `clear`  
--- ](<#/doc/container/deque/clear>) [ | `clear`  
--- ](<#/doc/container/forward_list/clear>) [ | `clear`  
--- ](<#/doc/container/list/clear>) [ | `clear`  
--- ](<#/doc/container/set/clear>) [ | `clear`  
--- ](<#/doc/container/multiset/clear>) [ | `clear`  
--- ](<#/doc/container/map/clear>) [ | `clear`  
--- ](<#/doc/container/multimap/clear>) [ | `clear`  
--- ](<#/doc/container/unordered_set/clear>) [ | `clear`  
--- ](<#/doc/container/unordered_multiset/clear>) [ | `clear`  
--- ](<#/doc/container/unordered_map/clear>) [ | `clear`  
--- ](<#/doc/container/unordered_multimap/clear>) |  |  | [ | `clear`  
--- ](<#/doc/container/flat_set/clear>) [ | `clear`  
--- ](<#/doc/container/flat_multiset/clear>) [ | `clear`  
--- ](<#/doc/container/flat_map/clear>) [ | `clear`  
--- ](<#/doc/container/flat_multimap/clear>) | `clear`  
---  
  
Modificadores   
| `insert`  
---  
  
[ | `insert`  
--- ](<#/doc/string/basic_string/insert>) | [ | `insert`  
--- ](<#/doc/container/vector/insert>) [ | `insert`  
--- ](<#/doc/container/deque/insert>) [ | `insert_after`  
--- ](<#/doc/container/forward_list/insert_after>) [ | `insert`  
--- ](<#/doc/container/list/insert>) [ | `insert`  
--- ](<#/doc/container/set/insert>) [ | `insert`  
--- ](<#/doc/container/multiset/insert>) [ | `insert`  
--- ](<#/doc/container/map/insert>) [ | `insert`  
--- ](<#/doc/container/multimap/insert>) [ | `insert`  
--- ](<#/doc/container/unordered_set/insert>) [ | `insert`  
--- ](<#/doc/container/unordered_multiset/insert>) [ | `insert`  
--- ](<#/doc/container/unordered_map/insert>) [ | `insert`  
--- ](<#/doc/container/unordered_multimap/insert>) |  |  | [ | `insert`  
--- ](<#/doc/container/flat_set/insert>) [ | `insert`  
--- ](<#/doc/container/flat_multiset/insert>) [ | `insert`  
--- ](<#/doc/container/flat_map/insert>) [ | `insert`  
--- ](<#/doc/container/flat_multimap/insert>) | `insert`  
---  
  
| `insert_range`  
---  
  
[ | `insert_range`  
--- ](<#/doc/string/basic_string/insert_range>) | [ | `insert_range`  
--- ](<#/doc/container/vector/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/deque/insert_range>) [ | `insert_range_after`  
--- ](<#/doc/container/forward_list/insert_range_after>) [ | `insert_range`  
--- ](<#/doc/container/list/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/set/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/multiset/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/map/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/multimap/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/unordered_set/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/unordered_multiset/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/unordered_map/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/unordered_multimap/insert_range>) |  |  | [ | `insert_range`  
--- ](<#/doc/container/flat_set/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/flat_multiset/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/flat_map/insert_range>) [ | `insert_range`  
--- ](<#/doc/container/flat_multimap/insert_range>) | `insert_range`  
---  
  
| `insert_or_assign`  
---  
  
|  |  |  |  |  |  |  | [ | `insert_or_assign`  
--- ](<#/doc/container/map/insert_or_assign>) |  |  | [ | `insert_or_assign`  
--- ](<#/doc/container/unordered_map/insert_or_assign>) |  |  |  |  |  | [ | `insert_or_assign`  
--- ](<#/doc/container/flat_map/insert_or_assign>) |  | `insert_or_assign`  
---  
  
| `emplace`  
---  
  
|  | [ | `emplace`  
--- ](<#/doc/container/vector/emplace>) [ | `emplace`  
--- ](<#/doc/container/deque/emplace>) [ | `emplace_after`  
--- ](<#/doc/container/forward_list/emplace_after>) [ | `emplace`  
--- ](<#/doc/container/list/emplace>) [ | `emplace`  
--- ](<#/doc/container/set/emplace>) [ | `emplace`  
--- ](<#/doc/container/multiset/emplace>) [ | `emplace`  
--- ](<#/doc/container/map/emplace>) [ | `emplace`  
--- ](<#/doc/container/multimap/emplace>) [ | `emplace`  
--- ](<#/doc/container/unordered_set/emplace>) [ | `emplace`  
--- ](<#/doc/container/unordered_multiset/emplace>) [ | `emplace`  
--- ](<#/doc/container/unordered_map/emplace>) [ | `emplace`  
--- ](<#/doc/container/unordered_multimap/emplace>) |  |  | [ | `emplace`  
--- ](<#/doc/container/flat_set/emplace>) [ | `emplace`  
--- ](<#/doc/container/flat_multiset/emplace>) [ | `emplace`  
--- ](<#/doc/container/flat_map/emplace>) [ | `emplace`  
--- ](<#/doc/container/flat_multimap/emplace>) | `emplace`  
---  
  
| `emplace_hint`  
---  
  
|  |  |  |  |  | [ | `emplace_hint`  
--- ](<#/doc/container/set/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/multiset/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/map/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/multimap/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/unordered_set/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/unordered_multiset/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/unordered_map/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/unordered_multimap/emplace_hint>) |  |  | [ | `emplace_hint`  
--- ](<#/doc/container/flat_set/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/flat_multiset/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/flat_map/emplace_hint>) [ | `emplace_hint`  
--- ](<#/doc/container/flat_multimap/emplace_hint>) | `emplace_hint`  
---  
  
| `try_emplace`  
---  
  
|  |  |  |  |  |  |  | [ | `try_emplace`  
--- ](<#/doc/container/map/try_emplace>) |  |  | [ | `try_emplace`  
--- ](<#/doc/container/unordered_map/try_emplace>) |  |  |  |  |  | [ | `try_emplace`  
--- ](<#/doc/container/flat_map/try_emplace>) |  | `try_emplace`  
---  
  
| `erase`  
---  
  
[ | `erase`  
--- ](<#/doc/string/basic_string/erase>) | [ | `erase`  
--- ](<#/doc/container/vector/erase>) [ | `erase`  
--- ](<#/doc/container/deque/erase>) [ | `erase_after`  
--- ](<#/doc/container/forward_list/erase_after>) [ | `erase`  
--- ](<#/doc/container/list/erase>) [ | `erase`  
--- ](<#/doc/container/set/erase>) [ | `erase`  
--- ](<#/doc/container/multiset/erase>) [ | `erase`  
--- ](<#/doc/container/map/erase>) [ | `erase`  
--- ](<#/doc/container/multimap/erase>) [ | `erase`  
--- ](<#/doc/container/unordered_set/erase>) [ | `erase`  
--- ](<#/doc/container/unordered_multiset/erase>) [ | `erase`  
--- ](<#/doc/container/unordered_map/erase>) [ | `erase`  
--- ](<#/doc/container/unordered_multimap/erase>) |  |  | [ | `erase`  
--- ](<#/doc/container/flat_set/erase>) [ | `erase`  
--- ](<#/doc/container/flat_multiset/erase>) [ | `erase`  
--- ](<#/doc/container/flat_map/erase>) [ | `erase`  
--- ](<#/doc/container/flat_multimap/erase>) | `erase`  
---  
  
| `push_front`  
---  
  
|  |  | [ | `push_front`  
--- ](<#/doc/container/deque/push_front>) [ | `push_front`  
--- ](<#/doc/container/forward_list/push_front>) [ | `push_front`  
--- ](<#/doc/container/list/push_front>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `push_front`  
---  
  
| `prepend_range`  
---  
  
|  |  | [ | `prepend_range`  
--- ](<#/doc/container/deque/prepend_range>) [ | `prepend_range`  
--- ](<#/doc/container/forward_list/prepend_range>) [ | `prepend_range`  
--- ](<#/doc/container/list/prepend_range>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `prepend_range`  
---  
  
| `emplace_front`  
---  
  
|  |  | [ | `emplace_front`  
--- ](<#/doc/container/deque/emplace_front>) [ | `emplace_front`  
--- ](<#/doc/container/forward_list/emplace_front>) [ | `emplace_front`  
--- ](<#/doc/container/list/emplace_front>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `emplace_front`  
---  
  
| `pop_front`  
---  
  
|  |  | [ | `pop_front`  
--- ](<#/doc/container/deque/pop_front>) [ | `pop_front`  
--- ](<#/doc/container/forward_list/pop_front>) [ | `pop_front`  
--- ](<#/doc/container/list/pop_front>) |  |  |  |  |  |  |  |  | [ | `pop`  
--- ](<#/doc/container/queue/pop>) [ | `pop`  
--- ](<#/doc/container/priority_queue/pop>) |  |  |  |  | `pop_front`  
---  
  
| `push_back`  
---  
  
[ | `push_back`  
--- ](<#/doc/string/basic_string/push_back>) | [ | `push_back`  
--- ](<#/doc/container/vector/push_back>) [ | `push_back`  
--- ](<#/doc/container/deque/push_back>) | [ | `push_back`  
--- ](<#/doc/container/list/push_back>) |  |  |  |  |  |  |  | [ | `push`  
--- ](<#/doc/container/stack/push>) [ | `push`  
--- ](<#/doc/container/queue/push>) [ | `push`  
--- ](<#/doc/container/priority_queue/push>) |  |  |  |  | `push_back`  
---  
  
| `append_range`  
---  
  
[ | `append_range`  
--- ](<#/doc/string/basic_string/append_range>) | [ | `append_range`  
--- ](<#/doc/container/vector/append_range>) [ | `append_range`  
--- ](<#/doc/container/deque/append_range>) | [ | `append_range`  
--- ](<#/doc/container/list/append_range>) |  |  |  |  |  |  |  | [ | `push_range`  
--- ](<#/doc/container/stack/push_range>) [ | `push_range`  
--- ](<#/doc/container/queue/push_range>) [ | `push_range`  
--- ](<#/doc/container/priority_queue/push_range>) |  |  |  |  | `append_range`  
---  
  
| `emplace_back`  
---  
  
|  | [ | `emplace_back`  
--- ](<#/doc/container/vector/emplace_back>) [ | `emplace_back`  
--- ](<#/doc/container/deque/emplace_back>) | [ | `emplace_back`  
--- ](<#/doc/container/list/emplace_back>) |  |  |  |  |  |  |  | [ | `emplace`  
--- ](<#/doc/container/stack/emplace>) [ | `emplace`  
--- ](<#/doc/container/queue/emplace>) [ | `emplace`  
--- ](<#/doc/container/priority_queue/emplace>) |  |  |  |  | `emplace_back`  
---  
  
| `pop_back`  
---  
  
[ | `pop_back`  
--- ](<#/doc/string/basic_string/pop_back>) | [ | `pop_back`  
--- ](<#/doc/container/vector/pop_back>) [ | `pop_back`  
--- ](<#/doc/container/deque/pop_back>) | [ | `pop_back`  
--- ](<#/doc/container/list/pop_back>) |  |  |  |  |  |  |  | [ | `pop`  
--- ](<#/doc/container/stack/pop>) |  |  |  |  |  |  | `pop_back`  
---  
  
| `swap`  
---  
  
[ | `swap`  
--- ](<#/doc/string/basic_string/swap>) [ | `swap`  
--- ](<#/doc/container/array/swap>) [ | `swap`  
--- ](<#/doc/container/vector/swap>) [ | `swap`  
--- ](<#/doc/container/deque/swap>) [ | `swap`  
--- ](<#/doc/container/forward_list/swap>) [ | `swap`  
--- ](<#/doc/container/list/swap>) [ | `swap`  
--- ](<#/doc/container/set/swap>) [ | `swap`  
--- ](<#/doc/container/multiset/swap>) [ | `swap`  
--- ](<#/doc/container/map/swap>) [ | `swap`  
--- ](<#/doc/container/multimap/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_set/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multiset/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_map/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multimap/swap>) [ | `swap`  
--- ](<#/doc/container/stack/swap>) [ | `swap`  
--- ](<#/doc/container/queue/swap>) [ | `swap`  
--- ](<#/doc/container/priority_queue/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_set/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multiset/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_map/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multimap/swap>) | `swap`  
---  
  
| `merge`  
---  
  
|  |  |  | [ | `merge`  
--- ](<#/doc/container/forward_list/merge>) [ | `merge`  
--- ](<#/doc/container/list/merge>) [ | `merge`  
--- ](<#/doc/container/set/merge>) [ | `merge`  
--- ](<#/doc/container/multiset/merge>) [ | `merge`  
--- ](<#/doc/container/map/merge>) [ | `merge`  
--- ](<#/doc/container/multimap/merge>) [ | `merge`  
--- ](<#/doc/container/unordered_set/merge>) [ | `merge`  
--- ](<#/doc/container/unordered_multiset/merge>) [ | `merge`  
--- ](<#/doc/container/unordered_map/merge>) [ | `merge`  
--- ](<#/doc/container/unordered_multimap/merge>) |  |  |  |  |  |  |  | `merge`  
---  
  
| `extract 1`  
---  
  
|  |  |  |  |  | [ | `extract`  
--- ](<#/doc/container/set/extract>) [ | `extract`  
--- ](<#/doc/container/multiset/extract>) [ | `extract`  
--- ](<#/doc/container/map/extract>) [ | `extract`  
--- ](<#/doc/container/multimap/extract>) [ | `extract`  
--- ](<#/doc/container/unordered_set/extract>) [ | `extract`  
--- ](<#/doc/container/unordered_multiset/extract>) [ | `extract`  
--- ](<#/doc/container/unordered_map/extract>) [ | `extract`  
--- ](<#/doc/container/unordered_multimap/extract>) |  |  |  |  |  |  |  | `extract`  
---  
  
Operações de lista  |  | `splice`  
---  
  
|  |  |  | [ | `splice_after`  
--- ](<#/doc/container/forward_list/splice_after>) [ | `splice`  
--- ](<#/doc/container/list/splice>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `splice`  
---  
  
Operações de lista   
| `remove`  
---  
  
|  |  |  | [ | `remove`  
--- ](<#/doc/container/forward_list/remove>) [ | `remove`  
--- ](<#/doc/container/list/remove>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `remove`  
---  
  
| `remove_if`  
---  
  
|  |  |  | [ | `remove_if`  
--- ](<#/doc/container/forward_list/remove>) [ | `remove_if`  
--- ](<#/doc/container/list/remove>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `remove_if`  
---  
  
| `reverse`  
---  
  
|  |  |  | [ | `reverse`  
--- ](<#/doc/container/forward_list/reverse>) [ | `reverse`  
--- ](<#/doc/container/list/reverse>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `reverse`  
---  
  
| `unique`  
---  
  
|  |  |  | [ | `unique`  
--- ](<#/doc/container/forward_list/unique>) [ | `unique`  
--- ](<#/doc/container/list/unique>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `unique`  
---  
  
| `sort`  
---  
  
|  |  |  | [ | `sort`  
--- ](<#/doc/container/forward_list/sort>) [ | `sort`  
--- ](<#/doc/container/list/sort>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `sort`  
---  
  
Bucket e Hash  |  | `begin(size_type)`  
---  
`cbegin(size_type)`  
  
|  |  |  |  |  |  |  |  |  | [ | `begin(size_type)`  
---  
`cbegin(size_type)` ](<#/doc/container/unordered_set/begin2>) [ | `begin(size_type)`  
---  
`cbegin(size_type)` ](<#/doc/container/unordered_multiset/begin2>) [ | `begin(size_type)`  
---  
`cbegin(size_type)` ](<#/doc/container/unordered_map/begin2>) [ | `begin(size_type)`  
---  
`cbegin(size_type)` ](<#/doc/container/unordered_multimap/begin2>) |  |  |  |  |  |  |  | `begin(size_type)`  
---  
`cbegin(size_type)`  
  
Bucket e Hash   
| `end(size_type)`  
---  
`cend(size_type)`  
  
|  |  |  |  |  |  |  |  |  | [ | `end(size_type)`  
---  
`cend(size_type)` ](<#/doc/container/unordered_set/end2>) [ | `end(size_type)`  
---  
`cend(size_type)` ](<#/doc/container/unordered_multiset/end2>) [ | `end(size_type)`  
---  
`cend(size_type)` ](<#/doc/container/unordered_map/end2>) [ | `end(size_type)`  
---  
`cend(size_type)` ](<#/doc/container/unordered_multimap/end>) |  |  |  |  |  |  |  | `end(size_type)`  
---  
`cend(size_type)`  
  
| `bucket_count`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `bucket_count`  
--- ](<#/doc/container/unordered_set/bucket_count>) [ | `bucket_count`  
--- ](<#/doc/container/unordered_multiset/bucket_count>) [ | `bucket_count`  
--- ](<#/doc/container/unordered_map/bucket_count>) [ | `bucket_count`  
--- ](<#/doc/container/unordered_multimap/bucket_count>) |  |  |  |  |  |  |  | `bucket_count`  
---  
  
| `max_bucket_count`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `max_bucket_count`  
--- ](<#/doc/container/unordered_set/max_bucket_count>) [ | `max_bucket_count`  
--- ](<#/doc/container/unordered_multiset/max_bucket_count>) [ | `max_bucket_count`  
--- ](<#/doc/container/unordered_map/max_bucket_count>) [ | `max_bucket_count`  
--- ](<#/doc/container/unordered_multimap/max_bucket_count>) |  |  |  |  |  |  |  | `max_bucket_count`  
---  
  
| `bucket_size`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `bucket_size`  
--- ](<#/doc/container/unordered_set/bucket_size>) [ | `bucket_size`  
--- ](<#/doc/container/unordered_multiset/bucket_size>) [ | `bucket_size`  
--- ](<#/doc/container/unordered_map/bucket_size>) [ | `bucket_size`  
--- ](<#/doc/container/unordered_multimap/bucket_size>) |  |  |  |  |  |  |  | `bucket_size`  
---  
  
| `bucket`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `bucket`  
--- ](<#/doc/container/unordered_set/bucket>) [ | `bucket`  
--- ](<#/doc/container/unordered_multiset/bucket>) [ | `bucket`  
--- ](<#/doc/container/unordered_map/bucket>) [ | `bucket`  
--- ](<#/doc/container/unordered_multimap/bucket>) |  |  |  |  |  |  |  | `bucket`  
---  
  
| `load_factor`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `load_factor`  
--- ](<#/doc/container/unordered_set/load_factor>) [ | `load_factor`  
--- ](<#/doc/container/unordered_multiset/load_factor>) [ | `load_factor`  
--- ](<#/doc/container/unordered_map/load_factor>) [ | `load_factor`  
--- ](<#/doc/container/unordered_multimap/load_factor>) |  |  |  |  |  |  |  | `load_factor`  
---  
  
| `max_load_factor`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `max_load_factor`  

--- ](<#/doc/container/unordered_set/max_load_factor>) [ | `max_load_factor`  
--- ](<#/doc/container/unordered_multiset/max_load_factor>) [ | `max_load_factor`  
--- ](<#/doc/container/unordered_map/max_load_factor>) [ | `max_load_factor`  
--- ](<#/doc/container/unordered_multimap/max_load_factor>) |  |  |  |  |  |  |  | `max_load_factor`  
---  
  
| `rehash`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `rehash`  
--- ](<#/doc/container/unordered_set/rehash>) [ | `rehash`  
--- ](<#/doc/container/unordered_multiset/rehash>) [ | `rehash`  
--- ](<#/doc/container/unordered_map/rehash>) [ | `rehash`  
--- ](<#/doc/container/unordered_multimap/rehash>) |  |  |  |  |  |  |  | `rehash`  
---  
  
Busca  |  | `count`  
---  
  
|  |  |  |  |  | [ | `count`  
--- ](<#/doc/container/set/count>) [ | `count`  
--- ](<#/doc/container/multiset/count>) [ | `count`  
--- ](<#/doc/container/map/count>) [ | `count`  
--- ](<#/doc/container/multimap/count>) [ | `count`  
--- ](<#/doc/container/unordered_set/count>) [ | `count`  
--- ](<#/doc/container/unordered_multiset/count>) [ | `count`  
--- ](<#/doc/container/unordered_map/count>) [ | `count`  
--- ](<#/doc/container/unordered_multimap/count>) |  |  | [ | `count`  
--- ](<#/doc/container/flat_set/count>) [ | `count`  
--- ](<#/doc/container/flat_multiset/count>) [ | `count`  
--- ](<#/doc/container/flat_map/count>) [ | `count`  
--- ](<#/doc/container/flat_multimap/count>) | `count`  
---  
  
Busca   
| `find`  
---  
  
[ | `find`  
--- ](<#/doc/string/basic_string/find>) |  |  |  |  | [ | `find`  
--- ](<#/doc/container/set/find>) [ | `find`  
--- ](<#/doc/container/multiset/find>) [ | `find`  
--- ](<#/doc/container/map/find>) [ | `find`  
--- ](<#/doc/container/multimap/find>) [ | `find`  
--- ](<#/doc/container/unordered_set/find>) [ | `find`  
--- ](<#/doc/container/unordered_multiset/find>) [ | `find`  
--- ](<#/doc/container/unordered_map/find>) [ | `find`  
--- ](<#/doc/container/unordered_multimap/find>) |  |  | [ | `find`  
--- ](<#/doc/container/flat_set/find>) [ | `find`  
--- ](<#/doc/container/flat_multiset/find>) [ | `find`  
--- ](<#/doc/container/flat_map/find>) [ | `find`  
--- ](<#/doc/container/flat_multimap/find>) | `find`  
---  
  
| `contains`  
---  
  
[ | `contains`  
--- ](<#/doc/string/basic_string/contains>) |  |  |  |  | [ | `contains`  
--- ](<#/doc/container/set/contains>) [ | `contains`  
--- ](<#/doc/container/multiset/contains>) [ | `contains`  
--- ](<#/doc/container/map/contains>) [ | `contains`  
--- ](<#/doc/container/multimap/contains>) [ | `contains`  
--- ](<#/doc/container/unordered_set/contains>) [ | `contains`  
--- ](<#/doc/container/unordered_multiset/contains>) [ | `contains`  
--- ](<#/doc/container/unordered_map/contains>) [ | `contains`  
--- ](<#/doc/container/unordered_multimap/contains>) |  |  | [ | `contains`  
--- ](<#/doc/container/flat_set/contains>) [ | `contains`  
--- ](<#/doc/container/flat_multiset/contains>) [ | `contains`  
--- ](<#/doc/container/flat_map/contains>) [ | `contains`  
--- ](<#/doc/container/flat_multimap/contains>) | `contains`  
---  
  
| `lower_bound`  
---  
  
|  |  |  |  |  | [ | `lower_bound`  
--- ](<#/doc/container/set/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/multiset/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/map/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/multimap/lower_bound>) |  |  |  |  |  |  | [ | `lower_bound`  
--- ](<#/doc/container/flat_set/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/flat_multiset/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/flat_map/lower_bound>) [ | `lower_bound`  
--- ](<#/doc/container/flat_multimap/lower_bound>) | `lower_bound`  
---  
  
| `upper_bound`  
---  
  
|  |  |  |  |  | [ | `upper_bound`  
--- ](<#/doc/container/set/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/multiset/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/map/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/multimap/upper_bound>) |  |  |  |  |  |  | [ | `upper_bound`  
--- ](<#/doc/container/flat_set/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/flat_multiset/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/flat_map/upper_bound>) [ | `upper_bound`  
--- ](<#/doc/container/flat_multimap/upper_bound>) | `upper_bound`  
---  
  
| `equal_range`  
---  
  
|  |  |  |  |  | [ | `equal_range`  
--- ](<#/doc/container/set/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/multiset/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/map/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/multimap/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/unordered_set/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/unordered_multiset/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/unordered_map/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/unordered_multimap/equal_range>) |  |  | [ | `equal_range`  
--- ](<#/doc/container/flat_set/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/flat_multiset/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/flat_map/equal_range>) [ | `equal_range`  
--- ](<#/doc/container/flat_multimap/equal_range>) | `equal_range`  
---  
  
Observadores  |  | `key_comp`  
---  
  
|  |  |  |  |  | [ | `key_comp`  
--- ](<#/doc/container/set/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/multiset/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/map/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/multimap/key_comp>) |  |  |  |  |  |  | [ | `key_comp`  
--- ](<#/doc/container/flat_set/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/flat_multiset/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/flat_map/key_comp>) [ | `key_comp`  
--- ](<#/doc/container/flat_multimap/key_comp>) | `key_comp`  
---  
  
Observadores   
| `value_comp`  
---  
  
|  |  |  |  |  | [ | `value_comp`  
--- ](<#/doc/container/set/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/multiset/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/map/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/multimap/value_comp>) |  |  |  |  |  |  | [ | `value_comp`  
--- ](<#/doc/container/flat_set/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/flat_multiset/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/flat_map/value_comp>) [ | `value_comp`  
--- ](<#/doc/container/flat_multimap/value_comp>) | `value_comp`  
---  
  
| `hash_function`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `hash_function`  
--- ](<#/doc/container/unordered_set/hash_function>) [ | `hash_function`  
--- ](<#/doc/container/unordered_multiset/hash_function>) [ | `hash_function`  
--- ](<#/doc/container/unordered_map/hash_function>) [ | `hash_function`  
--- ](<#/doc/container/unordered_multimap/hash_function>) |  |  |  |  |  |  |  | `hash_function`  
---  
  
| `key_eq`  
---  
  
|  |  |  |  |  |  |  |  |  | [ | `key_eq`  
--- ](<#/doc/container/unordered_set/key_eq>) [ | `key_eq`  
--- ](<#/doc/container/unordered_multiset/key_eq>) [ | `key_eq`  
--- ](<#/doc/container/unordered_map/key_eq>) [ | `key_eq`  
--- ](<#/doc/container/unordered_multimap/key_eq>) |  |  |  |  |  |  |  | `key_eq`  
---  
  
Alocador  |  | `get_allocator`  
---  
  
[ | `get_allocator`  
--- ](<#/doc/string/basic_string/get_allocator>) | [ | `get_allocator`  
--- ](<#/doc/container/vector/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/deque/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/forward_list/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/list/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/set/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/multiset/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/map/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/multimap/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/unordered_set/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/unordered_multiset/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/unordered_map/get_allocator>) [ | `get_allocator`  
--- ](<#/doc/container/unordered_multimap/get_allocator>) |  |  |  |  |  |  |  | `get_allocator`  
---  
  
Alocador   
Adaptadores  |  | `extract 2`  
---  
  
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | [ | `extract`  
--- ](<#/doc/container/flat_set/extract>) [ | `extract`  
--- ](<#/doc/container/flat_multiset/extract>) [ | `extract`  
--- ](<#/doc/container/flat_map/extract>) [ | `extract`  
--- ](<#/doc/container/flat_multimap/extract>) | `extract`  
---  
  
Adaptadores   
| `replace`  
---  
  
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | [ | `replace`  
--- ](<#/doc/container/flat_set/replace>) [ | `replace`  
--- ](<#/doc/container/flat_multiset/replace>) [ | `replace`  
--- ](<#/doc/container/flat_map/replace>) [ | `replace`  
--- ](<#/doc/container/flat_multimap/replace>) | `replace`  
---  
  
Contêiner  | [ | `basic_string`  
--- ](<#/doc/string/basic_string>) [ | `array`  
--- ](<#/doc/container/array>) [ | `vector`  
--- ](<#/doc/container/vector>) [ | `deque`  
--- ](<#/doc/container/deque>) [ | `forward_list`  
--- ](<#/doc/container/forward_list>) [ | `list`  
--- ](<#/doc/container/list>) [ | `set`  
--- ](<#/doc/container/set>) [ | `multiset`  
--- ](<#/doc/container/multiset>) [ | `map`  
--- ](<#/doc/container/map>) [ | `multimap`  
--- ](<#/doc/container/multimap>) [ | `unordered_set`  
--- ](<#/doc/container/unordered_set>) [ | `unordered_multiset`  
--- ](<#/doc/container/unordered_multiset>) [ | `unordered_map`  
--- ](<#/doc/container/unordered_map>) [ | `unordered_multimap`  
--- ](<#/doc/container/unordered_multimap>) [ | `stack`  
--- ](<#/doc/container/stack>) [ | `queue`  
--- ](<#/doc/container/queue>) [ | `priority_queue`  
--- ](<#/doc/container/priority_queue>) [ | `flat_set`  
--- ](<#/doc/container/flat_set>) [ | `flat_multiset`  
--- ](<#/doc/container/flat_multiset>) [ | `flat_map`  
--- ](<#/doc/container/flat_map>) [ | `flat_multimap`  
--- ](<#/doc/container/flat_multimap>) Contêiner   
Cabeçalho  | ``&lt;string&gt;`` | ``&lt;array&gt;`` | ``&lt;vector&gt;`` | ``&lt;deque&gt;`` | ``<forward_list>`` | ``&lt;list&gt;`` | ``&lt;set&gt;`` | ``&lt;map&gt;`` | ``<unordered_set>`` | ``<unordered_map>`` | ``&lt;stack&gt;`` | ``&lt;queue&gt;`` | ``<flat_set>`` | ``<flat_map>`` | Cabeçalho   
| Pseudo contêiner  | Contêineres de sequência  | Contêineres associativos  | Contêineres associativos não ordenados  | Adaptadores de contêiner  |   
  
  * Nota: funções em duas linhas `extract` diferentes têm significados e sintaxes distintas: 

  1. ↑ ex., node_type extract(const_iterator) ou node_type extract(Key&)
  2. ↑ ex., container_type extract() &&
```

#### Tabela de funções não-membro

```text
| Pseudo contêiner  | Contêineres de sequência  | Contêineres associativos  | Contêineres associativos não ordenados  | Adaptadores de contêiner  |   
Cabeçalho  | ``&lt;string&gt;`` | ``&lt;array&gt;`` | ``&lt;vector&gt;`` | ``&lt;deque&gt;`` | ``<forward_list>`` | ``&lt;list&gt;`` | ``&lt;set&gt;`` | ``&lt;map&gt;`` | ``<unordered_set>`` | ``<unordered_map>`` | ``&lt;stack&gt;`` | ``&lt;queue&gt;`` | ``<flat_set>`` | ``<flat_map>`` | Cabeçalho   
Contêiner  | [ | `basic_string`  
--- ](<#/doc/string/basic_string>) [ | `array`  
--- ](<#/doc/container/array>) [ | `vector`  
--- ](<#/doc/container/vector>) [ | `deque`  
--- ](<#/doc/container/deque>) [ | `forward_list`  
--- ](<#/doc/container/forward_list>) [ | `list`  
--- ](<#/doc/container/list>) [ | `set`  
--- ](<#/doc/container/set>) [ | `multiset`  
--- ](<#/doc/container/multiset>) [ | `map`  
--- ](<#/doc/container/map>) [ | `multimap`  
--- ](<#/doc/container/multimap>) [ | `unordered_set`  
--- ](<#/doc/container/unordered_set>) [ | `unordered_multiset`  
--- ](<#/doc/container/unordered_multiset>) [ | `unordered_map`  
--- ](<#/doc/container/unordered_map>) [ | `unordered_multimap`  
--- ](<#/doc/container/unordered_multimap>) [ | `stack`  
--- ](<#/doc/container/stack>) [ | `queue`  
--- ](<#/doc/container/queue>) [ | `priority_queue`  
--- ](<#/doc/container/priority_queue>) [ | `flat_set`  
--- ](<#/doc/container/flat_set>) [ | `flat_multiset`  
--- ](<#/doc/container/flat_multiset>) [ | `flat_map`  
--- ](<#/doc/container/flat_map>) [ | `flat_multimap`  
--- ](<#/doc/container/flat_multimap>) Contêiner   
Função não-membro  |  | `operator==`  
---  
  
[ | `operator==`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/multimap/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/unordered_set/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/unordered_multiset/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/unordered_map/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/unordered_multimap/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/queue/operator_cmp>) | [ | `operator==`  
--- ](<#/doc/container/flat_set/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/flat_multiset/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/flat_map/operator_cmp>) [ | `operator==`  
--- ](<#/doc/container/flat_multimap/operator_cmp>) | `operator==`  
---  
  
Função não-membro   
| `operator!= (removido em C++20)`  
---  
  
[ | `operator!=`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/multimap/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/unordered_set/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/unordered_multiset/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/unordered_map/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/unordered_multimap/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator!=`  
--- ](<#/doc/container/queue/operator_cmp>) |  |  |  |  |  | `operator!= (removido em C++20)`  
---  
  
| `operator< (removido em C++20)`  
---  
  
[ | `operator<`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/multimap/operator_cmp>) |  |  |  | [ | `operator<`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator<`  
--- ](<#/doc/container/queue/operator_cmp>) |  |  |  |  |  | `operator< (removido em C++20)`  
---  
  
| `operator<= (removido em C++20)`  
---  
  
[ | `operator<=`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/multimap/operator_cmp>) |  |  |  | [ | `operator<=`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator<=`  
--- ](<#/doc/container/queue/operator_cmp>) |  |  |  |  |  | `operator<= (removido em C++20)`  
---  
  
| `operator> (removido em C++20)`  
---  
  
[ | `operator>`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/multimap/operator_cmp>) |  |  |  | [ | `operator>`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator>`  
--- ](<#/doc/container/queue/operator_cmp>) |  |  |  |  |  | `operator> (removido em C++20)`  
---  
  
| `operator>= (removido em C++20)`  
---  
  
[ | `operator>=`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/multimap/operator_cmp>) |  |  |  | [ | `operator>=`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator>=`  
--- ](<#/doc/container/queue/operator_cmp>) |  |  |  |  |  | `operator>= (removido em C++20)`  
---  
  
| `operator<=>`  
---  
  
[ | `operator<=>`  
--- ](<#/doc/string/basic_string/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/array/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/vector/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/deque/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/forward_list/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/list/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/set/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/multiset/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/map/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/multimap/operator_cmp>) |  |  |  | [ | `operator<=>`  
--- ](<#/doc/container/stack/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/queue/operator_cmp>) | [ | `operator<=>`  
--- ](<#/doc/container/flat_set/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/flat_multiset/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/flat_map/operator_cmp>) [ | `operator<=>`  
--- ](<#/doc/container/flat_multimap/operator_cmp>) | `operator<=>`  
---  
  
| `swap`  
---  
  
[ | `swap`  
--- ](<#/doc/string/basic_string/swap>) [ | `swap`  
--- ](<#/doc/container/array/swap>) [ | `swap`  
--- ](<#/doc/container/vector/swap>) [ | `swap`  
--- ](<#/doc/container/deque/swap>) [ | `swap`  
--- ](<#/doc/container/forward_list/swap>) [ | `swap`  
--- ](<#/doc/container/list/swap>) [ | `swap`  
--- ](<#/doc/container/set/swap>) [ | `swap`  
--- ](<#/doc/container/multiset/swap>) [ | `swap`  
--- ](<#/doc/container/map/swap>) [ | `swap`  
--- ](<#/doc/container/multimap/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_set/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multiset/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_map/swap>) [ | `swap`  
--- ](<#/doc/container/unordered_multimap/swap>) [ | `swap`  
--- ](<#/doc/container/stack/swap>) [ | `swap`  
--- ](<#/doc/container/queue/swap>) [ | `swap`  
--- ](<#/doc/container/priority_queue/swap>) [ | `swap`  
--- ](<#/doc/container/flat_set/swap>) [ | `swap`  
--- ](<#/doc/container/flat_multiset/swap>) [ | `swap`  
--- ](<#/doc/container/flat_map/swap>) [ | `swap`  
--- ](<#/doc/container/flat_multimap/swap>) | `swap`  
---  
  
| `erase`  
---  
  
[ | `erase`  
--- ](<#/doc/string/basic_string/erase2>) | [ | `erase`  
--- ](<#/doc/container/vector/erase2>) [ | `erase`  
--- ](<#/doc/container/deque/erase2>) [ | `erase`  
--- ](<#/doc/container/forward_list/erase2>) [ | `erase`  
--- ](<#/doc/container/list/erase2>) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | `erase`  
---  
  
| `erase_if`  
---  
  
[ | `erase_if`  
--- ](<#/doc/string/basic_string/erase2>) | [ | `erase_if`  
--- ](<#/doc/container/vector/erase2>) [ | `erase_if`  
--- ](<#/doc/container/deque/erase2>) [ | `erase_if`  
--- ](<#/doc/container/forward_list/erase2>) [ | `erase_if`  
--- ](<#/doc/container/list/erase2>) [ | `erase_if`  
--- ](<#/doc/container/set/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/multiset/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/map/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/multimap/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/unordered_set/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/unordered_multiset/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/unordered_map/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/unordered_multimap/erase_if>) |  |  | [ | `erase_if`  
--- ](<#/doc/container/flat_set/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/flat_multiset/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/flat_map/erase_if>) [ | `erase_if`  
--- ](<#/doc/container/flat_multimap/erase_if>) | `erase_if`  
---  
  
Contêiner  | [ | `basic_string`  
--- ](<#/doc/string/basic_string>) [ | `array`  
--- ](<#/doc/container/array>) [ | `vector`  
--- ](<#/doc/container/vector>) [ | `deque`  
--- ](<#/doc/container/deque>) [ | `forward_list`  
--- ](<#/doc/container/forward_list>) [ | `list`  
--- ](<#/doc/container/list>) [ | `set`  
--- ](<#/doc/container/set>) [ | `multiset`  
--- ](<#/doc/container/multiset>) [ | `map`  
--- ](<#/doc/container/map>) [ | `multimap`  
--- ](<#/doc/container/multimap>) [ | `unordered_set`  
--- ](<#/doc/container/unordered_set>) [ | `unordered_multiset`  
--- ](<#/doc/container/unordered_multiset>) [ | `unordered_map`  
--- ](<#/doc/container/unordered_map>) [ | `unordered_multimap`  
--- ](<#/doc/container/unordered_multimap>) [ | `stack`  
--- ](<#/doc/container/stack>) [ | `queue`  
--- ](<#/doc/container/queue>) [ | `priority_queue`  
--- ](<#/doc/container/priority_queue>) [ | `flat_set`  
--- ](<#/doc/container/flat_set>) [ | `flat_multiset`  
--- ](<#/doc/container/flat_multiset>) [ | `flat_map`  
--- ](<#/doc/container/flat_map>) [ | `flat_multimap`  
--- ](<#/doc/container/flat_multimap>) Contêiner   
Cabeçalho  | ``&lt;string&gt;`` | ``&lt;array&gt;`` | ``&lt;vector&gt;`` | ``&lt;deque&gt;`` | ``<forward_list>`` | ``&lt;list&gt;`` | ``&lt;set&gt;`` | ``&lt;map&gt;`` | ``<unordered_set>`` | ``<unordered_map>`` | ``&lt;stack&gt;`` | ``&lt;queue&gt;`` | ``<flat_set>`` | ``<flat_map>`` | Cabeçalho   
| Pseudo contêiner  | Contêineres de sequência  | Contêineres associativos  | Contêineres associativos não ordenados  | Adaptadores de contêiner  |   
```

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 51](<https://cplusplus.github.io/LWG/issue51>) | C++98  | iteradores de contêiner podem ser invalidados  
por operações arbitrárias da biblioteca  | eles são invalidados apenas  
quando especificado   
  
### Veja também

Requisitos nomeados C++: 

  * [Container](<#/doc/named_req/Container>)
  * [SequenceContainer](<#/doc/named_req/SequenceContainer>)
  * [ContiguousContainer](<#/doc/named_req/ContiguousContainer>)
  * [ReversibleContainer](<#/doc/named_req/ReversibleContainer>)
  * [AssociativeContainer](<#/doc/named_req/AssociativeContainer>)
  * [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>)
  * [UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>)

[ valarray](<#/doc/numeric/valarray>) |  arrays numéricos, máscaras de array e fatias de array   
(modelo de classe)  
[ basic_string](<#/doc/string/basic_string>) |  armazena e manipula sequências de caracteres   
(modelo de classe)  
[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) |  visualização de string somente leitura   
(modelo de classe)