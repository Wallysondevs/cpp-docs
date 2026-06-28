# std::scoped_allocator_adaptor

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
template< class OuterAlloc, class... InnerAllocs >
class scoped_allocator_adaptor
: public OuterAlloc;
```

O template de classe `std::scoped_allocator_adaptor` é um alocador que pode ser usado com containers multinível (vetor de conjuntos de listas de tuplas de mapas, etc). Ele é instanciado com um tipo de alocador externo `OuterAlloc` e zero ou mais tipos de alocadores internos `InnerAlloc...`. Um container construído diretamente com um `scoped_allocator_adaptor` usa `OuterAlloc` para alocar seus elementos, mas se um elemento for ele próprio um container, ele usa o primeiro alocador interno. Os elementos desse container, se forem eles próprios containers, usam o segundo alocador interno, e assim por diante. Se houver mais níveis para o container do que alocadores internos, o último alocador interno é reutilizado para todos os containers aninhados subsequentes.

O propósito deste adaptador é inicializar corretamente alocadores com estado em containers aninhados, como quando todos os níveis de um container aninhado devem ser colocados no mesmo segmento de memória compartilhada. O construtor do adaptador recebe os argumentos para todos os alocadores na lista, e cada container aninhado obtém o estado do seu alocador do adaptador conforme necessário.

Para o propósito de `scoped_allocator_adaptor`, se o próximo alocador interno for `A`, qualquer classe `T` para a qual [std::uses_allocator](<#/doc/memory/uses_allocator>)<T,A>::value == true participa da recursão como se fosse um container. Além disso, [std::pair](<#/doc/utility/pair>) é tratado como tal container por sobrecargas específicas de [`scoped_allocator_adaptor::construct`](<#/doc/memory/scoped_allocator_adaptor/construct>).

Uma implementação típica mantém uma instância de um `std::scoped_allocator_adaptor<InnerAllocs...>` como um objeto membro.

Note que [`std::pmr::polymorphic_allocator`s](<#/doc/memory/polymorphic_allocator>) se propagam para containers aninhados seguindo a [construção uses-allocator](<#/doc/memory/uses_allocator>) e não precisam (e não funcionam com) `std::scoped_allocator_adaptor`.

### Tipos aninhados

Tipo | Definição
---|---
`outer_allocator_type` | `OuterAlloc`
`inner_allocator_type` |
  * scoped_allocator_adaptor&lt;OuterAlloc&gt; se sizeof...(InnerAllocs) for zero
  * scoped_allocator_adaptor<InnerAllocs...> caso contrário

`value_type` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::value_type
---|---
`size_type` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::size_type
`difference_type` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::difference_type
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::const_pointer
`void_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::void_pointer
`const_void_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::const_void_pointer

Dado o conjunto de `OuterAlloc` e `InnerAllocs...` como `Allocs`:

Tipo | Definição
---|---
`propagate_on_container_copy_assignment` |
  * [std::true_type](<#/doc/types/integral_constant>) se existir um tipo `A` em `Allocs` tal que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::
propagate_on_container_copy_assignment::value seja true
  * [std::false_type](<#/doc/types/integral_constant>) caso contrário

`propagate_on_container_move_assignment` |
  * [std::true_type](<#/doc/types/integral_constant>) se existir um tipo `A` em `Allocs` tal que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::
propagate_on_container_move_assignment::value seja true
  * [std::false_type](<#/doc/types/integral_constant>) caso contrário

`propagate_on_container_swap` |
  * [std::true_type](<#/doc/types/integral_constant>) se existir um tipo `A` em `Allocs` tal que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::
propagate_on_container_swap::value seja true
  * [std::false_type](<#/doc/types/integral_constant>) caso contrário

`is_always_equal` |
  * [std::true_type](<#/doc/types/integral_constant>) se existir um tipo `A` em `Allocs` tal que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::
is_always_equal::value seja true
  * [std::false_type](<#/doc/types/integral_constant>) caso contrário

### Funções membro

[ (construtor)](<#/doc/memory/scoped_allocator_adaptor/scoped_allocator_adaptor>) | cria um novo objeto `scoped_allocator_adaptor`
(função membro pública)
[ (destrutor)](<#/doc/memory/scoped_allocator_adaptor/~scoped_allocator_adaptor>) | destrói um objeto `scoped_allocator_adaptor`
(função membro pública)
[ operator=](<#/>) | atribui um `scoped_allocator_adaptor`
(função membro pública)
[ inner_allocator](<#/doc/memory/scoped_allocator_adaptor/inner_allocator>) | obtém uma referência para `inner_allocator`
(função membro pública)
[ outer_allocator](<#/doc/memory/scoped_allocator_adaptor/outer_allocator>) | obtém uma referência para `outer_allocator`
(função membro pública)
[ allocate](<#/doc/memory/scoped_allocator_adaptor/allocate>) | aloca armazenamento não inicializado usando o alocador externo
(função membro pública)
[ deallocate](<#/doc/memory/scoped_allocator_adaptor/deallocate>) | desaloca armazenamento usando o alocador externo
(função membro pública)
[ max_size](<#/doc/memory/scoped_allocator_adaptor/max_size>) | retorna o maior tamanho de alocação suportado pelo alocador externo
(função membro pública)
[ construct](<#/doc/memory/scoped_allocator_adaptor/construct>) | constrói um objeto em armazenamento alocado, passando o alocador interno para seu construtor se apropriado
(função membro pública)
[ destroy](<#/doc/memory/scoped_allocator_adaptor/destroy>) | destrói um objeto em armazenamento alocado
(função membro pública)
[ select_on_container_copy_construction](<#/doc/memory/scoped_allocator_adaptor/select_on_container_copy_construction>) | copia o estado de `scoped_allocator_adaptor` e de todos os seus alocadores
(função membro pública)

##### Templates de função apenas para exposição

[__outermost__](<#/doc/memory/scoped_allocator_adaptor/helpers>) | obtém o alocador mais externo
(função membro apenas para exposição*)
[__outermost-construct__](<#/doc/memory/scoped_allocator_adaptor/helpers>) | constrói um objeto usando o alocador mais externo
(função membro apenas para exposição*)
[__outermost-destroy__](<#/doc/memory/scoped_allocator_adaptor/helpers>) | destrói um objeto usando o alocador mais externo
(função membro apenas para exposição*)

### Funções não-membro

[ operator==operator!=](<#/doc/memory/scoped_allocator_adaptor/operator_cmp>)(removido em C++20) | compara dois objetos `scoped_allocator_adaptor`
(template de função)

### [Guias de dedução](<#/doc/memory/scoped_allocator_adaptor/deduction_guides>)(desde C++17)

### Classes aninhadas

Classe | Definição
---|---
`rebind` | template< class T >
struct rebind
{
using other = scoped_allocator_adaptor
<[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::template rebind_alloc&lt;T&gt;,
InnerAllocs...>;
};

### Exemplo

Execute este código
```cpp
    #include <boost/interprocess/allocators/adaptive_pool.hpp>
    #include <boost/interprocess/managed_shared_memory.hpp>
    #include <scoped_allocator>
    #include <vector>
    
    namespace bi = boost::interprocess;
    
    template<class T>
    using alloc = bi::adaptive_pool<T, bi::managed_shared_memory::segment_manager>;
    
    using ipc_row = std::vector<int, alloc<int>>;
    
    using ipc_matrix = std::vector<ipc_row, std::scoped_allocator_adaptor<alloc<ipc_row>>>;
    
    int main()
    {
        bi::managed_shared_memory s(bi::create_only, "Demo", 65536);
    
        // cria vetor de vetores em memória compartilhada
        ipc_matrix v(s.get_segment_manager());
    
        // para todas essas adições, os vetores internos obtêm seus argumentos de alocador
        // do scoped_allocator_adaptor do vetor externo
        v.resize(1);
        v[0].push_back(1);
        v.emplace_back(2);
        std::vector<int> local_row = {1, 2, 3};
        v.emplace_back(local_row.begin(), local_row.end());
    
        bi::shared_memory_object::remove("Demo");
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2108](<https://cplusplus.github.io/LWG/issue2108>) | C++11 | não havia como mostrar se `scoped_allocator_adaptor` é sem estado | fornecido `is_always_equal`

### Veja também

[ allocator_traits](<#/doc/memory/allocator_traits>)(C++11) | fornece informações sobre tipos de alocadores
(template de classe)
[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(template de classe)
[ allocator](<#/doc/memory/allocator>) | o alocador padrão
(template de classe)