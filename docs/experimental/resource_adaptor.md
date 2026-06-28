# std::experimental::pmr::resource_adaptor, std::pmr::experimental::resource_adaptor

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
template< class Alloc >
using resource_adaptor = /*resource-adaptor-imp*/<
typename std::allocator_traits<Alloc>::
template rebind_alloc<char>>;
template< class Alloc >
class /*resource-adaptor-imp*/ : public memory_resource; // apenas para fins de exposição
```

  
O alias template `resource_adaptor` adapta o tipo de alocador `Alloc` com uma interface `memory_resource`. O alocador é reassociado a um tipo de valor `char` antes de ser realmente adaptado (usando o class template _`resource-adaptor-imp`_), de modo que a adaptação de especializações do mesmo template de alocador sempre resulta no mesmo tipo, independentemente do tipo de valor com o qual o template de alocador foi originalmente instanciado. 

`resource_adaptor` é definido no namespace `std::experimental::pmr`, e o tipo base `memory_resource` nesta página é [std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>).  | (library fundamentals TS)  
(até library fundamentals TS v3)  
`resource_adaptor` é definido no namespace `std::pmr::experimental`, e o tipo base `memory_resource` nesta página é [std::pmr::memory_resource](<#/doc/memory/memory_resource>).  | (library fundamentals TS v3)  
  
_`resource-adaptor-imp`_ é um class template cujos membros são descritos abaixo. O nome _`resource-adaptor-imp`_ é apenas para fins de exposição e não é normativo. 

Além de atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>), `Alloc` deve adicionalmente satisfazer os seguintes requisitos: 

  * [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::pointer shall be identical to Alloc::value_type*. 
  * [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::const_pointer shall be identical to Alloc::value_type const*. 
  * [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::void_pointer shall be identical to void*. 
  * [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::const_const_pointer shall be identical to void const*. 

### Tipos de membro de _resource-adaptor-imp_

Tipo de membro  |  Definição   
---|---
`allocator_type` |  `Alloc`  
  
### Funções de membro de _resource-adaptor-imp_

## _resource-adaptor-imp_ ::_resource-adaptor-imp_

/*resource-adaptor-imp*/() = default; |  (1)  |  (library fundamentals TS)  
/*resource-adaptor-imp*/(const /*resource-adaptor-imp*/& other)  
= default; |  (2)  |  (library fundamentals TS)  
/*resource-adaptor-imp*/(/*resource-adaptor-imp*/&& other)  
= default; |  (3)  |  (library fundamentals TS)  
---|---|---
explicit /*resource-adaptor-imp*/(const Alloc& a2); |  (4)  |  (library fundamentals TS)  
explicit /*resource-adaptor-imp*/(Alloc&& a2); |  (5)  |  (library fundamentals TS)  

  
1) Construtor padrão. Constrói por padrão o alocador encapsulado.

2) Construtor de cópia. Constrói por cópia o alocador encapsulado a partir do alocador encapsulado por `other`.

3) Construtor de movimento. Constrói por movimento o alocador encapsulado a partir do alocador encapsulado por `other`.

4) Inicializa o alocador encapsulado com `a2`.

5) Inicializa o alocador encapsulado com std::move(a2).

#### Parâmetros

other  |  \-  |  outro objeto _`resource-adaptor-imp`_ para copiar ou mover   
---|---|---
a2  |  \-  |  outro objeto `Alloc` para copiar ou mover   
  
## _resource-adaptor-imp_ ::get_allocator 

allocator_type get_allocator() const; |  |  (library fundamentals TS)  

  
Retorna uma cópia do alocador encapsulado. 

## _resource-adaptor-imp_ ::operator= 

/*resource-adaptor-imp*/& operator=(const /*resource-adaptor-imp*/& other)  
= default; |  |  (library fundamentals TS)  

  
Operador de atribuição de cópia padrão. Atribui por cópia o alocador encapsulado a partir do de `other`. 

## _resource-adaptor-imp_ ::do_allocate 

protected:  
virtual void* do_allocate([std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment); |  |  (library fundamentals TS)  

  
Aloca memória usando a função de membro `allocate` do alocador encapsulado. 

## _resource-adaptor-imp_ ::do_deallocate 

protected:  
virtual void do_deallocate(void *p, [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment); |  |  (library fundamentals TS)  

  
Desaloca o armazenamento apontado por `p` usando a função de membro `deallocate` do alocador encapsulado. 

`p` deve ter sido alocado usando a função de membro `allocate` de um alocador que se compara como igual ao alocador encapsulado, e não deve ter sido desalocado subsequentemente. 

## _resource-adaptor-imp_ ::do_is_equal 

protected:  
virtual bool do_is_equal(const memory_resource& other) const noexcept; |  |  (library fundamentals TS)  

  
Seja `p` dynamic_cast&lt;const /*resource-adaptor-imp*/*&gt;(&other). Se `p` for um valor de ponteiro nulo, retorna `false`. Caso contrário, retorna o resultado da comparação dos alocadores encapsulados por *p e *this usando operator==. 