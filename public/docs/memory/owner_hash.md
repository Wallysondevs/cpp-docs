# std::owner_hash

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
struct owner_hash;
```

  
Este objeto de função fornece hashing baseado em proprietário (em oposição a baseado em valor) tanto de [std::weak_ptr](<#/doc/memory/weak_ptr>) quanto de [std::shared_ptr](<#/doc/memory/shared_ptr>). 

### Tipos aninhados

Tipo aninhado  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções membro

** operator()** |  calcula o hash do ponteiro de propriedade compartilhada   
(função)  
  
##  std::owner_hash::operator()

```cpp
template< class T >
std::size_t operator()( const std::shared_ptr<T>& key ) const noexcept;  // (1) (desde C++26)
template< class T >
std::size_t operator()( const std::weak_ptr<T>& key ) const noexcept;  // (2) (desde C++26)
```

  
Equivalente a return key.owner_hash();. 

###  Parâmetros

key  |  \-  |  ponteiro de propriedade compartilhada a ser hashed   
  
###  Valor de retorno

Um valor de hash que é idêntico para qualquer objeto [std::shared_ptr](<#/doc/memory/shared_ptr>) ou [std::weak_ptr](<#/doc/memory/weak_ptr>) compartilhando a mesma propriedade. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_smart_ptr_owner_equality`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Permite o uso de `std::shared_ptr` e `std::weak_ptr` como chaves em [contêineres associativos não ordenados](<#/doc/container>)  
  
### Veja também

[ owner_hash](<#/doc/memory/shared_ptr/owner_hash>)(C++26) |  fornece hashing baseado em proprietário de ponteiros compartilhados   
(função membro pública de `std::shared_ptr<T>`)  
[ owner_hash](<#/doc/memory/weak_ptr/owner_hash>)(C++26) |  fornece hashing baseado em proprietário de ponteiros fracos   
(função membro pública de `std::weak_ptr<T>`)