# Node handle (C++17)

```cpp
template</* unspecified */>
class /*node-handle*/;  // (desde C++17)
(apenas para exposição*)
```

  
Contêineres associativos [std::set](<#/doc/container/set>), [std::map](<#/doc/container/map>), [std::multiset](<#/doc/container/multiset>), [std::multimap](<#/doc/container/multimap>), [std::unordered_set](<#/doc/container/unordered_set>), [std::unordered_map](<#/doc/container/unordered_map>), [std::unordered_multiset](<#/doc/container/unordered_multiset>), [std::unordered_multimap](<#/doc/container/unordered_multimap>) são estruturas de dados baseadas em nós, e seus nós podem ser extraídos como um objeto de tipo não especificado conhecido como _node handle_. 

Um node handle é um tipo move-only que possui e fornece acesso ao elemento (o `value_type`) armazenado no nó, e fornece acesso não-const à parte da chave do elemento (o `key_type`) e à parte mapeada do elemento (o `mapped_type`). Se o node handle for destruído enquanto detém o nó, o nó é propriamente destruído usando o alocador apropriado para o contêiner. O node handle contém uma cópia do alocador do contêiner. Isso é necessário para que o node handle possa sobreviver ao contêiner. 

O tipo exato de node handle (mostrado aqui como /*node-handle*/) é não especificado, mas cada contêiner expõe seu tipo de node handle como o membro `node_type`. 

Node handles podem ser usados para transferir a propriedade de um elemento entre dois contêineres associativos com o mesmo tipo de chave, valor e alocador (ignorando comparação ou hash/igualdade), sem invocar quaisquer operações de cópia/movimentação no elemento do contêiner (este tipo de operação é conhecido como "splicing"). A transferência entre contêineres únicos e não-únicos também é permitida: um node handle de um [std::map](<#/doc/container/map>) pode ser inserido em um [std::multimap](<#/doc/container/multimap>), mas não em um [std::unordered_map](<#/doc/container/unordered_map>) ou [std::set](<#/doc/container/set>). 

Um node handle pode estar vazio, caso em que não contém nenhum elemento e nenhum alocador. O node handle construído por padrão e movido-de está vazio. Além disso, um node handle vazio pode ser produzido por uma chamada falha à função membro do contêiner `extract`. 

Ponteiros e referências a um elemento que são obtidos enquanto ele é de propriedade de um node handle são invalidados se o elemento for inserido com sucesso em um contêiner. 

Para todos os contêineres de mapa ([std::map](<#/doc/container/map>), [std::multimap](<#/doc/container/multimap>), [std::unordered_map](<#/doc/container/unordered_map>), e [std::unordered_multimap](<#/doc/container/unordered_multimap>)) cujo `key_type` é `K` e `mapped_type` é `T`, o comportamento das operações envolvendo node handles é indefinido se uma especialização definida pelo usuário de [std::pair](<#/doc/utility/pair>) existir para [std::pair](<#/doc/utility/pair>)<K, T> ou [std::pair](<#/doc/utility/pair>)&lt;const K, T&gt;. 

### Tipos Membro

Tipo  |  Definição   
---|---
`key_type` (apenas contêineres de mapa) |  a chave armazenada no nó  
`mapped_type` (apenas contêineres de mapa) |  a parte mapeada do elemento armazenado no nó  
`value_type` (apenas contêineres de conjunto) |  o elemento armazenado no nó  
`allocator_type` |  o alocador a ser usado ao destruir o elemento  
`_container_node_type_` (privado) |  um nó de contêiner, o tipo é não especificado  
(tipo membro apenas para exposição*)  
`_ator_traits_` (privado) |  traits de alocador do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>  
(tipo membro apenas para exposição*)  
  
### Membros de Dados

Membro  |  Definição   
typename ator_traits::template  
rebind_traits<container_node_type>::pointer `_ptr__`   
(presente condicionalmente) |  TODO  
(objeto membro apenas para exposição*)  
[std::optional](<#/doc/utility/optional>)<allocator_type> `_alloc__`   
(presente condicionalmente) |  TODO  
(objeto membro apenas para exposição*)  
  
### Funções Membro

## Construtores

```cpp
constexpr /*node-handle*/() noexcept;  // (1)
/*node-handle*/(/*node-handle*/&& nh) noexcept;  // (2)
```

  
1) O construtor padrão inicializa o node handle para o estado vazio.

2) O construtor de movimentação assume a propriedade do elemento do contêiner de nh, constrói por movimentação o alocador membro e deixa nh no estado vazio.

### Parâmetros

nh  |  \-  |  um node handle com o mesmo tipo (não necessariamente o mesmo contêiner)   
  
### Observações

Node handles são move-only, o construtor de cópia não é definido. 

## operator=

/*node-handle*/& operator=(/*node-handle*/&& nh);

  
  * Se o node handle não estiver vazio, 

    

  * destrói o subobjeto `value_type` no objeto elemento do contêiner gerenciado por este node handle chamando `ator_traits::destroy`; 
  * desaloca o elemento do contêiner chamando ator_traits::rebind_traits</*container-node-type*/>::deallocate; 

  * Adquire a propriedade do elemento do contêiner de nh; 
  * Se o node handle estava vazio (e, portanto, não continha um alocador) ou se ator_traits::propagate_on_container_move_assignment for true, atribui por movimentação o alocador de nh; 
  * define nh para o estado vazio. 

O comportamento é indefinido se o nó não estiver vazio e ator_traits::propagate_on_container_move_assignment for false e os alocadores não forem iguais. 

### Parâmetros

nh  |  \-  |  node handle com o mesmo tipo (não necessariamente o mesmo contêiner)   
  
### Retorno

*this

### Exceções

Não lança exceções. 

### Observações

Node handles são move-only, a atribuição de cópia não é definida. 

## Destrutor

~/*node-handle*/();

  
  * Se o node handle não estiver vazio, 

    

  * destrói o subobjeto `value_type` no objeto elemento do contêiner gerenciado por este node handle chamando ator_traits::destroy; 
  * desaloca o elemento do contêiner chamando ator_traits::rebind_traits</*container-node-type*/>::deallocate. 

## empty

bool empty() const noexcept;

  
Retorna true se o node handle estiver vazio, false caso contrário. 

## operator bool

explicit operator bool() const noexcept;

  
Converte para false se o node handle estiver vazio, true caso contrário. 

## get_allocator

allocator_type get_allocator() const;

  
Retorna uma cópia do alocador armazenado (que é uma cópia do alocador do contêiner de origem). O comportamento é indefinido se o node handle estiver vazio. 

### Exceções

Não lança exceções. 

## value

value_type& value() const; |  | (apenas contêineres de conjunto)  

  
Retorna uma referência ao subobjeto `value_type` no objeto elemento do contêiner gerenciado por este node handle. O comportamento é indefinido se o node handle estiver vazio. 

### Exceções

Não lança exceções. 

## key

key_type& key() const; |  | (apenas contêineres de mapa)  

  
Retorna uma referência não-const ao membro `key_type` do subobjeto `value_type` no objeto elemento do contêiner gerenciado por este node handle. O comportamento é indefinido se o node handle estiver vazio. 

### Exceções

Não lança exceções. 

### Observações

Esta função torna possível modificar a chave de um nó extraído de um mapa e, em seguida, reinseri-lo no mapa, sem nunca copiar ou mover o elemento. 

## mapped

mapped_type& mapped() const; |  | (apenas contêineres de mapa)  

  
Retorna uma referência ao membro `mapped_type` do subobjeto `value_type` no objeto elemento do contêiner gerenciado por este node handle. O comportamento é indefinido se o node handle estiver vazio. 

### Exceções

Não lança exceções. 

## swap

void swap(/*node-handle*/& nh) noexcept(/* veja abaixo */);

  
  * troca a propriedade dos nós do contêiner; 
  * se um nó estiver vazio ou se ambos os nós não estiverem vazios e ator_traits::propagate_on_container_swap for true, troca os alocadores também. 

O comportamento é indefinido se ambos os nós não estiverem vazios e ator_traits::propagate_on_container_swap for false e os alocadores não forem iguais. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(ator_traits::propagate_on_container_swap::value
ator_traits::is_always_equal::value)

### Funções Não-Membro

## swap

friend void swap(/*node-handle*/& x, /*node-handle*/& y) noexcept(noexcept(x.swap(y)));

  
Executa efetivamente x.swap(y). 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `_node-handle_` é uma classe associada dos argumentos. 