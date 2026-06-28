# std::priority_queue

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template<
class T,
class Container = std::vector<T>,
class Compare = std::less<typename Container::value_type>
> class priority_queue;
```

  
A [priority queue](<https://en.wikipedia.org/wiki/Queue_\(abstract_data_type\)> "enwiki:Queue \(abstract data type\)") é um [adaptador de container](<#/doc/container>) que fornece busca em tempo constante do maior elemento (por padrão), à custa de inserção e extração logarítmicas.

Um `Compare` fornecido pelo usuário pode ser fornecido para alterar a ordenação, por exemplo, usar `[std::greater](<#/doc/utility/functional/greater>)<T>` faria com que o menor elemento aparecesse como o `[top()](<#/doc/container/priority_queue/top>)`.

Trabalhar com uma `priority_queue` é semelhante a gerenciar um [heap](<#/doc/algorithm/make_heap>) em algum container de acesso aleatório, com o benefício de não ser possível invalidar acidentalmente o heap.

### Parâmetros de template

T  |  \-  |  O tipo dos elementos armazenados. O programa é malformado se `T` não for do mesmo tipo que `Container::value_type`.   
---|---|---
Container  |  \-  |  O tipo do container subjacente a ser usado para armazenar os elementos. O container deve satisfazer os requisitos de [SequenceContainer](<#/doc/named_req/SequenceContainer>), e seus iteradores devem satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). Além disso, ele deve fornecer as seguintes funções com a [semântica usual](<#/doc/named_req/SequenceContainer>): 

  * front(), e.g., [std::vector::front()](<#/doc/container/vector/front>), 
  * push_back(), e.g., [std::deque::push_back()](<#/doc/container/deque/push_back>), 
  * pop_back(), e.g., [std::vector::pop_back()](<#/doc/container/vector/pop_back>). 

Os containers padrão [std::vector](<#/doc/container/vector>) (incluindo [`std::vector<bool>`](<#/doc/container/vector_bool>)) e [std::deque](<#/doc/container/deque>) satisfazem esses requisitos.   
Compare  |  \-  |  Um tipo [Compare](<#/doc/named_req/Compare>) que fornece uma ordenação fraca estrita. Note que o parâmetro `Compare` é definido de forma que ele retorna `true` se seu primeiro argumento vem _antes_ de seu segundo argumento em uma ordenação fraca. Mas como a priority queue produz os maiores elementos primeiro, os elementos que "vêm antes" são na verdade produzidos por último. Ou seja, a frente da fila contém o "último" elemento de acordo com a ordenação fraca imposta por `Compare`.   
  
### Tipos de membros

Tipo de membro  |  Definição   
---|---
`container_type` |  `Container`  
`value_compare` |  `Compare`  
`value_type` |  `Container::value_type`  
`size_type` |  Container::size_type  
`reference` |  `Container::reference`  
`const_reference` |  `Container::const_reference`  
  
### Objetos de membros

Nome do membro  |  Definição   
---|---
Container c |  o container subjacente   
(objeto membro protegido)  
Compare comp |  o objeto de função de comparação   
(objeto membro protegido)  
  
### Funções de membros

[ (construtor)](<#/doc/container/priority_queue/priority_queue>) |  constrói a `priority_queue`   
(função membro pública)  
[ (destrutor)](<#/doc/container/priority_queue/~priority_queue>) |  destrói a `priority_queue`   
(função membro pública)  
[ operator=](<#/>) |  atribui valores ao adaptador de container   
(função membro pública)  
  
#####  Acesso a elementos   
  
[ top](<#/doc/container/priority_queue/top>) |  acessa o elemento superior   
(função membro pública)  
  
#####  Capacidade   
  
[ empty](<#/doc/container/priority_queue/empty>) |  verifica se o adaptador de container está vazio   
(função membro pública)  
[ size](<#/doc/container/priority_queue/size>) |  retorna o número de elementos   
(função membro pública)  
  
#####  Modificadores   
  
[ push](<#/doc/container/priority_queue/push>) |  insere elemento e ordena o container subjacente   
(função membro pública)  
[ push_range](<#/doc/container/priority_queue/push_range>)(desde C++23) |  insere um range de elementos e ordena o container subjacente   
(função membro pública)  
[ emplace](<#/doc/container/priority_queue/emplace>)(desde C++11) |  constrói elemento no local e ordena o container subjacente   
(função membro pública)  
[ pop](<#/doc/container/priority_queue/pop>) |  remove o elemento superior   
(função membro pública)  
[ swap](<#/doc/container/priority_queue/swap>)(desde C++11) |  troca o conteúdo   
(função membro pública)  
  
### Funções não-membro

[ std::swap(std::priority_queue)](<#/doc/container/priority_queue/swap2>)(desde C++11) |  especializa o algoritmo `std::swap`   
(template de função)  
  
### Classes auxiliares

[ std::uses_allocator<std::priority_queue>](<#/doc/container/priority_queue/uses_allocator>)(desde C++11) |  especializa o type trait `std::uses_allocator`   
(especialização de template de classe)  
[ std::formatter<std::priority_queue>](<#/doc/container/priority_queue/formatter>)(desde C++23) |  suporte a formatação para `std::priority_queue`   
(especialização de template de classe)  
  
###  [Guias de dedução](<#/doc/container/priority_queue/deduction_guides>)

| (desde C++17)  
  
### Notas

Macro de teste de recurso  | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção `Ranges-aware` para containers   
  
### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <queue>
    #include <string_view>
    #include <vector>
    
    template<typename T>
    void pop_println(std::string_view rem, T& pq)
    {
        std::cout << rem << ": ";
        for (; !pq.empty(); pq.pop())
            std::cout << pq.top() << ' ';
        std::cout << '\n';
    }
    
    template<typename T>
    void println(std::string_view rem, const T& v)
    {
        std::cout << rem << ": ";
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        const auto data = {1, 8, 5, 6, 3, 4, 0, 9, 7, 2};
        println("data", data);
    
        std::priority_queue<int> max_priority_queue;
    
        // Fill the priority queue.
        for (int n : data)
            max_priority_queue.push(n);
    
        pop_println("max_priority_queue", max_priority_queue);
    
        // std::greater<int> makes the max priority queue act as a min priority queue.
        std::priority_queue<int, std::vector<int>, std::greater<int>>
            min_priority_queue1(data.begin(), data.end());
    
        pop_println("min_priority_queue1", min_priority_queue1);
    
        // Second way to define a min priority queue.
        std::priority_queue min_priority_queue2(data.begin(), data.end(), std::greater<int>());
    
        pop_println("min_priority_queue2", min_priority_queue2);
    
        // Using a custom function object to compare elements.
        struct
        {
            bool operator()(const int l, const int r) const { return l > r; }
        } customLess;
    
        std::priority_queue custom_priority_queue(data.begin(), data.end(), customLess);
    
        pop_println("custom_priority_queue", custom_priority_queue);
    
        // Using lambda to compare elements.
        auto cmp =  { return (left ^ 1) < (right ^ 1); };
        std::priority_queue<int, std::vector<int>, decltype(cmp)> lambda_priority_queue(cmp);
    
        for (int n : data)
            lambda_priority_queue.push(n);
    
        pop_println("lambda_priority_queue", lambda_priority_queue);
    }
```

Saída: 
```
    data: 1 8 5 6 3 4 0 9 7 2
    max_priority_queue: 9 8 7 6 5 4 3 2 1 0
    min_priority_queue1: 0 1 2 3 4 5 6 7 8 9
    min_priority_queue2: 0 1 2 3 4 5 6 7 8 9
    custom_priority_queue: 0 1 2 3 4 5 6 7 8 9
    lambda_priority_queue: 8 9 6 7 4 5 2 3 0 1
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 307](<https://cplusplus.github.io/LWG/issue307>) | C++98  | `Container` não podia ser `std::vector<bool>` | permitido   
[LWG 2566](<https://cplusplus.github.io/LWG/issue2566>) | C++98  | Ausência do requisito para `Container::value_type` | malformado se `T` não for do mesmo tipo que `Container::value_type`  
[LWG 2684](<https://cplusplus.github.io/LWG/issue2684>) | C++98  | `priority_queue` aceita um comparador, mas não tinha um typedef de membro para ele | adicionado   
  
### Veja também

[ vector](<#/doc/container/vector>) |  array contíguo dinâmico   
(template de classe)  
[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) |  bitset dinâmico com eficiência de espaço   
(especialização de template de classe)  
[ deque](<#/doc/container/deque>) |  fila de duas pontas   
(template de classe)