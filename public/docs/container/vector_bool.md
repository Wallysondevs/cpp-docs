# std::vector&lt;bool&gt;

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
template<
class Allocator
> class vector<bool, Allocator>;
```

  
std::`vector`&lt;bool&gt; é uma especialização possivelmente eficiente em espaço de [std::vector](<#/doc/container/vector>) para o tipo bool. 

A maneira pela qual std::`vector`&lt;bool&gt; é tornada eficiente em espaço (assim como se é otimizada de alguma forma) é definida pela implementação. Uma otimização potencial envolve a coalescência de elementos do vector de modo que cada elemento ocupe um único bit em vez de sizeof(bool) bytes. 

std::`vector`&lt;bool&gt; se comporta de forma semelhante a [std::vector](<#/doc/container/vector>), mas para ser eficiente em espaço, ela: 

  * Não armazena necessariamente seus elementos como um array contíguo. 
  * Expõe a classe std::`vector`&lt;bool&gt;::[`reference`](<#/doc/container/vector_bool/reference>) como um método de acesso a bits individuais. Em particular, objetos desta classe são retornados por [`operator[]`](<#/doc/container/vector/operator_at>) por valor. 
  * Não usa std::allocator_traits::construct para construir valores de bit. 
  * Não garante que diferentes elementos no mesmo container possam ser modificados concorrentemente por diferentes threads. 

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`value_type` |  bool  
`allocator_type` |  `Allocator`  
`size_type` |  definido pela implementação  
`difference_type` |  definido pela implementação  
[ reference](<#/doc/container/vector_bool/reference>) |  classe proxy representando uma referência a um único bool   
(classe)  
`const_reference` |  bool  
---|---
`pointer` |  definido pela implementação  
`const_pointer` |  definido pela implementação  
`iterator` |  |  definido pela implementação  | (até C++20)  
definido pela implementação [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) | (desde C++20)  
`const_iterator` |  |  definido pela implementação  | (até C++20)  
definido pela implementação [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) | (desde C++20)  
`reverse_iterator` |  [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;  
`const_reverse_iterator` |  [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>  
  
### Funções membro

[ (construtor)](<#/doc/container/vector/vector>) |  constrói o `vector`   
(função membro pública de `std::vector<T,Allocator>`)  
[ (destrutor)](<#/doc/container/vector/~vector>) |  destrói o `vector`   
(função membro pública de `std::vector<T,Allocator>`)  
[ operator=](<#/>) |  atribui valores ao container   
(função membro pública de `std::vector<T,Allocator>`)  
[ assign](<#/doc/container/vector/assign>) |  atribui valores ao container   
(função membro pública de `std::vector<T,Allocator>`)  
[ assign_range](<#/doc/container/vector/assign_range>)(C++23) |  atribui um range de valores ao container   
(função membro pública de `std::vector<T,Allocator>`)  
[ get_allocator](<#/doc/container/vector/get_allocator>) |  retorna o alocador associado   
(função membro pública de `std::vector<T,Allocator>`)  
  
#####  Acesso a elementos   
  
[ at](<#/doc/container/vector/at>) |  acessa o elemento especificado com verificação de limites   
(função membro pública de `std::vector<T,Allocator>`)  
[ operator[]](<#/doc/container/vector/operator_at>) |  acessa o elemento especificado   
(função membro pública de `std::vector<T,Allocator>`)  
[ front](<#/doc/container/vector/front>) |  acessa o primeiro elemento   
(função membro pública de `std::vector<T,Allocator>`)  
[ back](<#/doc/container/vector/back>) |  acessa o último elemento   
(função membro pública de `std::vector<T,Allocator>`)  
  
#####  Iteradores   
  
[ begin cbegin](<#/doc/container/vector/begin>)(desde C++11) |  retorna um iterator para o início   
(função membro pública de `std::vector<T,Allocator>`)  
[ end cend](<#/doc/container/vector/end>)(desde C++11) |  retorna um iterator para o fim   
(função membro pública de `std::vector<T,Allocator>`)  
[ rbegin crbegin](<#/doc/container/vector/rbegin>)(desde C++11) |  retorna um reverse iterator para o início   
(função membro pública de `std::vector<T,Allocator>`)  
[ rend crend](<#/doc/container/vector/rend>)(desde C++11) |  retorna um reverse iterator para o fim   
(função membro pública de `std::vector<T,Allocator>`)  
  
#####  Capacidade   
  
[ empty](<#/doc/container/vector/empty>) |  verifica se o container está vazio   
(função membro pública de `std::vector<T,Allocator>`)  
[ size](<#/doc/container/vector/size>) |  retorna o número de elementos   
(função membro pública de `std::vector<T,Allocator>`)  
[ max_size](<#/doc/container/vector/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública de `std::vector<T,Allocator>`)  
[ reserve](<#/doc/container/vector/reserve>) |  reserva armazenamento   
(função membro pública de `std::vector<T,Allocator>`)  
[ capacity](<#/doc/container/vector/capacity>) |  retorna o número de elementos que podem ser armazenados no armazenamento atualmente alocado   
(função membro pública de `std::vector<T,Allocator>`)  
  
#####  Modificadores   
  
[ clear](<#/doc/container/vector/clear>) |  limpa o conteúdo   
(função membro pública de `std::vector<T,Allocator>`)  
[ insert](<#/doc/container/vector/insert>) |  insere elementos   
(função membro pública de `std::vector<T,Allocator>`)  
[ insert_range](<#/doc/container/vector/insert_range>)(C++23) |  insere um range de elementos   
(função membro pública de `std::vector<T,Allocator>`)  
[ append_range](<#/doc/container/vector/append_range>)(C++23) |  adiciona um range de elementos ao final   
(função membro pública de `std::vector<T,Allocator>`)  
[ emplace](<#/doc/container/vector/emplace>)(desde C++11) |  constrói o elemento no local   
(função membro pública de `std::vector<T,Allocator>`)  
[ erase](<#/doc/container/vector/erase>) |  apaga elementos   
(função membro pública de `std::vector<T,Allocator>`)  
[ push_back](<#/doc/container/vector/push_back>) |  adiciona um elemento ao final   
(função membro pública de `std::vector<T,Allocator>`)  
[ emplace_back](<#/doc/container/vector/emplace_back>)(desde C++11) |  constrói um elemento no local no final   
(função membro pública de `std::vector<T,Allocator>`)  
[ pop_back](<#/doc/container/vector/pop_back>) |  remove o último elemento   
(função membro pública de `std::vector<T,Allocator>`)  
[ resize](<#/doc/container/vector/resize>) |  altera o número de elementos armazenados   
(função membro pública de `std::vector<T,Allocator>`)  
[ swap](<#/doc/container/vector/swap>) |  troca o conteúdo   
(função membro pública de `std::vector<T,Allocator>`)  
  
#####  Modificadores específicos de `vector<bool>`   
  
[ flip](<#/doc/container/vector_bool/flip>) |  inverte todos os bits   
(função membro pública)  
[ swap](<#/doc/container/vector_bool/swap>)[static] |  troca duas `std::vector<bool>::`[`references`](<#/doc/container/vector_bool/reference>)   
(função membro estática pública)  
  
### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/vector/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) |  compara lexicograficamente os valores de dois `vector`s   
(modelo de função)  
[ std::swap(std::vector)](<#/doc/container/vector/swap2>) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  
[ erase(std::vector)erase_if(std::vector)](<#/doc/container/vector/erase2>)(C++20) |  apaga todos os elementos que satisfazem critérios específicos   
(modelo de função)  
  
### Classes auxiliares

[ std::hash<std::vector&lt;bool&gt;>](<#/doc/container/vector_bool/hash>)(desde C++11) |  suporte a hash para std::`vector` &lt;bool&gt;   
(especialização de modelo de classe)  
  
### [Guias de dedução](<#/doc/container/vector/deduction_guides>) (C++17)

### Notas

Se o tamanho do bitset for conhecido em tempo de compilação, [std::bitset](<#/doc/utility/bitset>) pode ser usado, o que oferece um conjunto mais rico de funções membro. Além disso, [`boost::dynamic_bitset`](<https://www.boost.org/doc/libs/release/libs/dynamic_bitset/dynamic_bitset.html>) existe como uma alternativa a std::`vector`&lt;bool&gt;. 

Como sua representação pode ser otimizada, std::`vector`&lt;bool&gt; não necessariamente atende a todos os requisitos de [Container](<#/doc/named_req/Container>) ou [SequenceContainer](<#/doc/named_req/SequenceContainer>). Por exemplo, como std::`vector`&lt;bool&gt;::iterator é definido pela implementação, ele pode não satisfazer o requisito de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>). O uso de algoritmos como [std::search](<#/doc/algorithm/search>) que exigem [LegacyForwardIterators](<#/doc/named_req/ForwardIterator>) pode resultar em [erros em tempo de compilação ou em tempo de execução](<https://www.boost.org/doc/libs/release/libs/dynamic_bitset/dynamic_bitset.html#rationale>). 

A [versão Boost.Container de `vector`](<https://www.boost.org/doc/libs/release/doc/html/boost/container/vector.html>) não se especializa para bool. 

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers   
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2187](<https://cplusplus.github.io/LWG/issue2187>) | C++11  | especializações para bool não possuíam as funções membro `emplace` e `emplace_back`  | adicionado 