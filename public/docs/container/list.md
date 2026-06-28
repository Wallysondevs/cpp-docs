# std::list

Definido no cabeçalho `[<list>](<#/doc/header/list>)`

```c
template<
class T,
class Allocator = std::allocator<T>
> class list;
namespace pmr {
template< class T >
using list = std::list<T, std::pmr::polymorphic_allocator<T>>;
}
```

`std::list` é um container que suporta inserção e remoção de elementos em tempo constante de qualquer lugar no container. Acesso aleatório rápido não é suportado. Geralmente é implementado como uma lista duplamente encadeada. Comparado a [std::forward_list](<#/doc/container/forward_list>), este container oferece capacidade de iteração bidirecional, embora seja menos eficiente em termos de espaço.

Adicionar, remover e mover elementos dentro da lista ou entre várias listas não invalida os iteradores ou referências. Um iterador é invalidado apenas quando o elemento correspondente é excluído.

`std::list` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [SequenceContainer](<#/doc/named_req/SequenceContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Parâmetros de template

- **T** — O tipo dos elementos. | `T` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>). `T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) se [`list::operator=`](<#/>) ou [`list::assign`](<#/doc/container/list/assign>) for instanciado com `T`. | (até C++11)
Os requisitos impostos aos elementos dependem das operações reais realizadas no container. Geralmente, é exigido que o tipo do elemento seja um tipo completo e atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. | (desde C++11)
(até C++17)
Os requisitos impostos aos elementos dependem das operações reais realizadas no container. Geralmente, é exigido que o tipo do elemento atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. Este container (mas não seus membros) pode ser instanciado com um tipo de elemento incompleto se o alocador satisfizer os [requisitos de completude do alocador](<#/doc/named_req/Allocator>). | [Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
[`__cpp_lib_incomplete_container_elements`](<#/doc/feature_test>) | [`201505L`](<#/>) | (C++17) | Suporte mínimo a tipos incompletos
(desde C++17)

- **Allocator** — Um alocador que é usado para adquirir/liberar memória e para construir/destruir os elementos nessa memória. O tipo deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>). O comportamento é indefinido (até C++20) O programa é malformado (desde C++20) se `Allocator::value_type` não for o mesmo que `T`.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | `T`
`allocator_type` | `Allocator`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer | (desde C++11)
`const_pointer` | | `Allocator::const_pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer | (desde C++11)
`iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para `value_type`
`const_iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Funções membro

[ (construtor)](<#/doc/container/list/list>) | constrói a `list`
(função membro pública)
[ (destrutor)](<#/doc/container/list/~list>) | destrói a `list`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ assign](<#/doc/container/list/assign>) | atribui valores ao container
(função membro pública)
[ assign_range](<#/doc/container/list/assign_range>)(C++23) | atribui um range de valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/list/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Acesso a elementos

[ front](<#/doc/container/list/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/list/back>) | acessa o último elemento
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/list/begin>)(C++11) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/container/list/end>)(C++11) | retorna um iterador para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/list/rbegin>)(C++11) | retorna um iterador reverso para o início
(função membro pública)
[ rendcrend](<#/doc/container/list/rend>)(C++11) | retorna um iterador reverso para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/list/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/list/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/list/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/list/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/list/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/list/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/list/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ erase](<#/doc/container/list/erase>) | apaga elementos
(função membro pública)
[ push_back](<#/doc/container/list/push_back>) | adiciona um elemento ao final
(função membro pública)
[ emplace_back](<#/doc/container/list/emplace_back>)(C++11) | constrói um elemento no local no final
(função membro pública)
[ append_range](<#/doc/container/list/append_range>)(C++23) | adiciona um range de elementos ao final
(função membro pública)
[ pop_back](<#/doc/container/list/pop_back>) | remove o último elemento
(função membro pública)
[ push_front](<#/doc/container/list/push_front>) | insere um elemento no início
(função membro pública)
[ emplace_front](<#/doc/container/list/emplace_front>)(C++11) | constrói um elemento no local no início
(função membro pública)
[ prepend_range](<#/doc/container/list/prepend_range>)(C++23) | adiciona um range de elementos ao início
(função membro pública)
[ pop_front](<#/doc/container/list/pop_front>) | remove o primeiro elemento
(função membro pública)
[ resize](<#/doc/container/list/resize>) | altera o número de elementos armazenados
(função membro pública)
[ swap](<#/doc/container/list/swap>) | troca o conteúdo
(função membro pública)

##### Operações

[ merge](<#/doc/container/list/merge>) | mescla duas listas ordenadas
(função membro pública)
[ splice](<#/doc/container/list/splice>) | move elementos de outra `list`
(função membro pública)
[ removeremove_if](<#/doc/container/list/remove>) | remove elementos que satisfazem critérios específicos
(função membro pública)
[ reverse](<#/doc/container/list/reverse>) | inverte a ordem dos elementos
(função membro pública)
[ unique](<#/doc/container/list/unique>) | remove elementos duplicados consecutivos
(função membro pública)
[ sort](<#/doc/container/list/sort>) | ordena os elementos
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/list/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `list`s
(modelo de função)
[ std::swap(std::list)](<#/doc/container/list/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase(std::list)erase_if(std::list)](<#/doc/container/list/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/list/deduction_guides>)

| (desde C++17)

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <list>
    
    int main()
    {
        // Create a list containing integers
        std::list<int> l = {7, 5, 16, 8};
    
        // Add an integer to the front of the list
        l.push_front(25);
        // Add an integer to the back of the list
        l.push_back(13);
    
        // Insert an integer before 16 by searching
        auto it = std::find(l.begin(), l.end(), 16);
        if (it != l.end())
            l.insert(it, 42);
    
        // Print out the list
        std::cout << "l = { ";
        for (int n : l)
            std::cout << n << ", ";
        std::cout << "};\n";
    }
```

Saída:
```
    l = { 25, 7, 5, 42, 16, 8, 13, };
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `T` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(um elemento do tipo `T` pode não ser capaz de ser construído) | `T` também é exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>)
[LWG 276](<https://cplusplus.github.io/LWG/issue276>) | C++98 | `T` sempre foi exigido ser [CopyAssignable](<#/doc/named_req/CopyAssignable>) | somente exigido se [`operator=`](<#/>) ou
[`assign`](<#/doc/container/list/assign>) for instanciado com `T`

### Veja também

[ forward_list](<#/doc/container/forward_list>)(C++11) | lista simplesmente encadeada
(modelo de classe)