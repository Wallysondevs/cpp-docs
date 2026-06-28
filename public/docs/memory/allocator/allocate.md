# std::allocator&lt;T&gt;::allocate

```cpp
  // (1)
pointer allocate( size_type n, const void* hint = 0 );  // (até C++17)
T* allocate( std::size_t n, const void* hint );  // (desde C++17)
(deprecated)
(removed in C++20)
  // (2)
T* allocate( std::size_t n );  // (desde C++17)
(até C++20)
constexpr T* allocate( std::size_t n );  // (desde C++20)
```

  
Aloca n * sizeof(T) bytes de armazenamento não inicializado chamando ::[operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>)) ou ::[operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>), [std::align_val_t](<#/doc/memory/new/align_val_t>))(desde C++17), mas é não especificado quando e como esta função é chamada. O ponteiro hint pode ser usado para fornecer localidade de referência: o alocador, se suportado pela implementação, tentará alocar o novo bloco de memória o mais próximo possível de hint. 

Em seguida, esta função cria um array do tipo `T[n]` no armazenamento e inicia sua lifetime, mas não inicia a lifetime de nenhum de seus elementos. 

O uso desta função é malformado se `T` for um [tipo incompleto](<#/doc/language/type-id>). 

Para usar esta função em uma expressão constante, o armazenamento alocado deve ser desalocado dentro da avaliação da mesma expressão.  | (desde C++20)  
  
### Parâmetros

n  |  \-  |  o número de objetos para os quais alocar armazenamento   
---|---|---
hint  |  \-  |  ponteiro para uma localização de memória próxima   
  
### Valor de retorno

Ponteiro para o primeiro elemento de um array de n objetos do tipo `T` cujos elementos ainda não foram construídos. 

### Exceções

Lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) se [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>::max() / sizeof(T) < n.  | (desde C++11)  
  
Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação falhar. 

### Notas

A redação "não especificado quando e como" torna possível [combinar ou otimizar alocações de heap](<#/doc/language/new>) feitas pelos containers da standard library, mesmo que tais otimizações não sejam permitidas para chamadas diretas a `::operator new`. Por exemplo, isso é implementado pelo libc++ ([1](<https://github.com/llvm-mirror/libcxx/blob/master@%7B2017-02-09%7D/include/memory#L1766-L1772>) e [2](<https://github.com/llvm-mirror/libcxx/blob/master@%7B2017-02-09%7D/include/new#L211-L217>)). 

Após chamar `allocate()` e antes da construção dos elementos, a aritmética de ponteiros de `T*` é bem definida dentro do array alocado, mas o comportamento é indefinido se os elementos forem acessados. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 578](<https://cplusplus.github.io/LWG/issue578>) | C++98  | hint era exigido ser ​0​ ou um ponteiro previamente retornado de `allocate()` e ainda não passado para [deallocate()](<#/doc/memory/allocator/deallocate>) | não exigido   
[LWG 3190](<https://cplusplus.github.io/LWG/issue3190>) | C++11  | `allocate()` poderia alocar armazenamento de tamanho incorreto  | lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) em vez disso   
  
### Veja também

[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] |  aloca armazenamento não inicializado usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  