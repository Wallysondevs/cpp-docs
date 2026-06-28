# Biblioteca de gerenciamento de memória

### Ponteiros inteligentes (desde C++11)  
  
Ponteiros inteligentes permitem o gerenciamento automático e seguro contra exceções do tempo de vida de objetos.

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
  
##### Categorias de ponteiros   
  
[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | ponteiro inteligente com semântica de propriedade única de objeto   
(class template)  
[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | ponteiro inteligente com semântica de propriedade compartilhada de objeto   
(class template)  
[ weak_ptr](<#/doc/memory/weak_ptr>)(C++11) | referência fraca a um objeto gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>)   
(class template)  
[ auto_ptr](<#/doc/memory/auto_ptr>)(obsoleto em C++11)(removido em C++17) | ponteiro inteligente com semântica de propriedade estrita de objeto   
(class template)  
  
##### Classes auxiliares   
  
[ owner_less](<#/doc/memory/owner_less>)(C++11) | fornece ordenação de shared e weak pointers baseada em proprietário de tipos mistos   
(class template)  
[ owner_hash](<#/doc/memory/owner_hash>)(C++26) | fornece hashing baseado em proprietário para shared e weak pointers   
(class)  
[ owner_equal](<#/doc/memory/owner_equal>)(C++26) | fornece comparações de igualdade baseadas em proprietário de tipos mistos para shared e weak pointers   
(class)  
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(C++11) | permite que um objeto crie um `shared_ptr` referindo-se a si mesmo   
(class template)  
[ bad_weak_ptr](<#/doc/memory/bad_weak_ptr>)(C++11) | exceção lançada ao acessar um `weak_ptr` que se refere a um objeto já destruído   
(class)  
[ default_delete](<#/doc/memory/default_delete>)(C++11) | deleter padrão para [unique_ptr](<#/doc/memory/unique_ptr>)   
(class template)  
  
##### Adaptadores de ponteiros inteligentes (desde C++23)  
  
[ out_ptr_t](<#/doc/memory/out_ptr_t>)(C++23) | interoperates com setters de ponteiros externos e redefine um ponteiro inteligente na destruição   
(class template)  
[ out_ptr](<#/doc/memory/out_ptr_t/out_ptr>)(C++23) | cria um `out_ptr_t` com um ponteiro inteligente associado e argumentos de redefinição   
(function template)  
[ inout_ptr_t](<#/doc/memory/inout_ptr_t>)(C++23) | interoperates com setters de ponteiros externos, obtém o valor inicial do ponteiro de um ponteiro inteligente e o redefine na destruição   
(class template)  
[ inout_ptr](<#/doc/memory/inout_ptr_t/inout_ptr>)(C++23) | cria um `inout_ptr_t` com um ponteiro inteligente associado e argumentos de redefinição   
(function template)  
  
### Alocadores

Alocadores são class templates que encapsulam a estratégia de alocação de memória. Isso permite que containers genéricos desacoplem o gerenciamento de memória dos próprios dados.

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ allocator](<#/doc/memory/allocator>) | o alocador padrão   
(class template)  
[ allocator_traits](<#/doc/memory/allocator_traits>)(C++11) | fornece informações sobre tipos de alocadores   
(class template)  
[ allocation_result](<#/doc/memory/allocation_result>)(C++23) | registra o endereço e o tamanho real do armazenamento alocado por `allocate_at_least`   
(class template)  
[ allocator_argallocator_arg_t](<#/doc/memory/allocator_arg_t>)(C++11) | uma tag usada para selecionar construtores cientes de alocadores  
(tag)  
[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator   
(class template)  
[ uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(C++20) | prepara a lista de argumentos que corresponde ao tipo de construção uses-allocator exigido pelo tipo fornecido   
(function template)  
[ make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>)(C++20) | cria um objeto do tipo fornecido por meio de construção uses-allocator   
(function template)  
[ uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>)(C++20) | cria um objeto do tipo fornecido em um local de memória especificado por meio de construção uses-allocator   
(function template)  
Definido no header `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`  

```cpp
 scoped_allocator_adaptor(C++11)
(class template)
Definido no header `<memory_resource>`
Definido no namespace `std::pmr`
 polymorphic_allocator(C++17)
(class template)
```

  
### Recursos de memória (desde C++17)

Recursos de memória implementam estratégias de alocação de memória que podem ser usadas por [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>).

Definido no header `[<memory_resource>](<#/doc/header/memory_resource>)`  
---  
Definido no namespace `std::pmr`  

```cpp
 memory_resource(C++17)
(class)
 new_delete_resource(C++17)
(function)
 null_memory_resource(C++17)
(function)
 get_default_resource(C++17)
(function)
 set_default_resource(C++17)
(function)
 pool_options(C++17)
(class)
 synchronized_pool_resource(C++17)
(class)
 unsynchronized_pool_resource(C++17)
(class)
 monotonic_buffer_resource(C++17)
(class)
```

  
### Armazenamento não inicializado (até C++17)

Várias utilidades são fornecidas para criar e acessar armazenamento bruto.

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ raw_storage_iterator](<#/doc/memory/raw_storage_iterator>)(obsoleto em C++17)(removido em C++20) | um iterator que permite que algoritmos padrão armazenem resultados em memória não inicializada   
(class template)  
[ get_temporary_buffer](<#/doc/memory/get_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | obtém armazenamento não inicializado   
(function template)  
[ return_temporary_buffer](<#/doc/memory/return_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | libera armazenamento não inicializado   
(function template)  
  
### Algoritmos de memória não inicializada

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | copia um range de objetos para uma área de memória não inicializada   
(function template)  
[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(C++11) | copia um número de objetos para uma área de memória não inicializada   
(function template)  
[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) | copia um objeto para uma área de memória não inicializada, definida por um range   
(function template)  
[ uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem   
(function template)  
[ uninitialized_move](<#/doc/memory/uninitialized_move>)(C++17) | move um range de objetos para uma área de memória não inicializada   
(function template)  
[ uninitialized_move_n](<#/doc/memory/uninitialized_move_n>)(C++17) | move um número de objetos para uma área de memória não inicializada   
(function template)  
[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(C++17) | constrói objetos por [default-initialization](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range   
(function template)  
[ uninitialized_default_construct_n](<#/doc/memory/uninitialized_default_construct_n>)(C++17) | constrói objetos por [default-initialization](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem   
(function template)  
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(C++17) | constrói objetos por [value-initialization](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range   
(function template)  
[ uninitialized_value_construct_n](<#/doc/memory/uninitialized_value_construct_n>)(C++17) | constrói objetos por [value-initialization](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem   
(function template)  
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) | destrói um objeto em um endereço fornecido   
(function template)  
[ destroy](<#/doc/memory/destroy>)(C++17) | destrói um range de objetos   
(function template)  
[ destroy_n](<#/doc/memory/destroy_n>)(C++17) | destrói um número de objetos em um range   
(function template)  
[ construct_at](<#/doc/memory/construct_at>)(C++20) | cria um objeto em um endereço fornecido   
(function template)  
  
### Algoritmos de memória não inicializada restritos (desde C++20)

C++20 fornece algoritmos de memória não inicializada [restritos](<#/doc/language/constraints>) que aceitam argumentos de range ou pares iterator-sentinel.

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
Definido no namespace `std::ranges`  

```cpp
_no-throw-input-iterator no-throw-forward-iteratorno-throw-sentinel-forno-throw-input-rangeno-throw-forward-range_(C++20)
(exposition-only concept*)
 ranges::uninitialized_copy(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_copy_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_fill(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_fill_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_move(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_move_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_default_construct(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_default_construct_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_value_construct(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_value_construct_n(C++20)
(objeto de função de algoritmo)
 ranges::destroy_at(C++20)
(objeto de função de algoritmo)
 ranges::destroy(C++20)
(objeto de função de algoritmo)
 ranges::destroy_n(C++20)
(objeto de função de algoritmo)
 ranges::construct_at(C++20)
(objeto de função de algoritmo)
```

  
### Suporte a coletor de lixo (até C++23)

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ declare_reachable](<#/doc/memory/gc/declare_reachable>)(C++11)(removido em C++23) | declara que um objeto não pode ser reciclado   
(function)  
[ undeclare_reachable](<#/doc/memory/gc/undeclare_reachable>)(C++11)(removido em C++23) | declara que um objeto pode ser reciclado   
(function template)  
[ declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)(C++11)(removido em C++23) | declara que uma área de memória não contém ponteiros rastreáveis   
(function)  
[ undeclare_no_pointers](<#/doc/memory/gc/undeclare_no_pointers>)(C++11)(removido em C++23) | cancela o efeito de [std::declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)   
(function)  
[ pointer_safety](<#/doc/memory/gc/pointer_safety>)(C++11)(removido em C++23) | lista modelos de segurança de ponteiro   
(enum)  
[ get_pointer_safety](<#/doc/memory/gc/get_pointer_safety>)(C++11)(removido em C++23) | retorna o modelo de segurança de ponteiro atual   
(function)  
  
### Gerenciamento explícito de tempo de vida (desde C++23)

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ start_lifetime_asstart_lifetime_as_array](<#/doc/memory/start_lifetime_as>)(C++23) | cria implicitamente objetos em um armazenamento fornecido com a representação do objeto reutilizada   
(function template)  
  
### Diversos

Definido no header `[<memory>](<#/doc/header/memory>)`  
---  
[ pointer_traits](<#/doc/memory/pointer_traits>)(C++11) | fornece informações sobre tipos semelhantes a ponteiros   
(class template)  
[ to_address](<#/doc/memory/to_address>)(C++20) | obtém um ponteiro bruto de um tipo semelhante a ponteiro   
(function template)  
[ addressof](<#/doc/memory/addressof>)(C++11) | obtém o endereço real de um objeto, mesmo que o operador `&` esteja sobrecarregado   
(function template)  
[ align](<#/doc/memory/align>)(C++11) | alinha um ponteiro em um buffer   
(function)  
[ assume_aligned](<#/doc/memory/assume_aligned>)(C++20) | informa ao compilador que um ponteiro está alinhado   
(function template)  
[ is_sufficiently_aligned](<#/doc/memory/is_sufficiently_aligned>)(C++26) | verifica se o ponteiro aponta para um objeto cujo alinhamento tem pelo menos o valor fornecido   
(function template)  
  
### [Gerenciamento de memória de baixo nível](<#/doc/memory/new>)

Inclui, por exemplo, [operator new](<#/doc/memory/new/operator_new>), [operator delete](<#/doc/memory/new/operator_delete>), [std::set_new_handler](<#/doc/memory/new/set_new_handler>).

Definido no header `[<new>](<#/doc/header/new>)`  
---  
  
### [Gerenciamento de memória estilo C](<#/doc/memory/c>)

Inclui, por exemplo, [std::malloc](<#/doc/memory/c/malloc>), [std::free](<#/doc/memory/c/free>).

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`  
---