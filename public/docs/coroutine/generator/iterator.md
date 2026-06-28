# std::generator&lt;Ref,V,Allocator&gt;::iterator

```cpp
class /*iterator*/;  // (apenas para exposição*)
```

  
O tipo de retorno de [`generator::begin`](<#/doc/coroutine/generator>). Modela [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e [`input_iterator`](<#/doc/iterator/input_iterator>). 

### Tipos membro

Tipo membro  |  Definição   
---|---
`value_type` |  [`std::generator::value`](<#/doc/coroutine/generator>)  
`difference_type` |  [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)  
  
### Membros de dados

Membro  |  Descrição   
---|---
[std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<std::generator::promise_type> `_coroutine__` |  O handle da coroutine  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/coroutine/generator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator=](<#/doc/coroutine/generator/iterator>) |  atribui outro iterator   
(função membro pública)  
[ operator*](<#/doc/coroutine/generator/iterator>) |  retorna um valor subjacente   
(função membro pública)  
[ operator++operator++(int)](<#/doc/coroutine/generator/iterator>) |  avança o iterator   
(função membro pública)  
  
##  std::generator::_iterator_ ::_iterator_

```cpp
/*iterator*/( /*iterator*/&& other ) noexcept;  // (desde C++23)
```

  
Inicializa `_[coroutine_](<#/doc/coroutine/generator/iterator>)_` com [std::exchange](<#/doc/utility/exchange>)(other.coroutine_, {});. 

##  std::generator::_iterator_ ::operator=

```cpp
/*iterator*/& operator=( /*iterator*/&& other ) noexcept;  // (desde C++23)
```

  
Equivalente a coroutine_ = [std::exchange](<#/doc/utility/exchange>)(other.coroutine_, {});. 

Retorna: *this. 

##  std::generator::_iterator_ ::operator*

```cpp
reference operator*() const
noexcept( std::is_nothrow_copy_constructible_v<reference> );  // (desde C++23)
```

  
  1. Seja [`_reference_`](<#/doc/coroutine/generator>) o tipo subjacente de [`std::generator`](<#/doc/coroutine/generator>). 
  2. Seja para algum objeto generator x seu `_[coroutine_](<#/doc/coroutine/generator/iterator>)_` na pilha *x.active_. 
  3. Seja x.active_->top() referindo-se a uma coroutine suspensa com objeto promise p. 

Equivalente a return static_cast&lt;reference&gt;(*p.value_);. 

##  std::generator::_iterator_ ::operator++

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
```

  
1) Seja para algum objeto generator x o `_[coroutine_](<#/doc/coroutine/generator/iterator>)_` na pilha *x.active_.

Equivalente a x.active_->top().resume().

Retorna: *this.

2) Equivalente a ++*this;. 

### Funções não-membro

[ operator==](<#/doc/coroutine/generator/iterator>)(C++23) |  compara o iterator subjacente com um sentinel   
(função)  
  
##  operator==(std::generator::_iterator_)

```cpp
friend bool operator==( const /*iterator*/& i, std::default_sentinel_t );  // (desde C++23)
```

  
Equivalente a return i.coroutine_.done();. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::generator::_iterator_` é uma classe associada dos argumentos. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   