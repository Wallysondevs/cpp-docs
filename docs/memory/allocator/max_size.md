# std::allocator&lt;T&gt;::max_size

```cpp
size_type max_size() const throw();  // (até C++11)
size_type max_size() const noexcept;  // (desde C++11)
(obsoleto em C++17)
(removido em C++20)
```

  
Retorna o valor máximo teoricamente possível de `n`, para o qual a chamada [allocate](<#/doc/memory/allocator/allocate>)(n, 0) poderia ser bem-sucedida. 

Na maioria das implementações, isso retorna [std::numeric_limits](<#/doc/types/numeric_limits>)<size_type>::max() / sizeof(value_type). 

### Parâmetros

(nenhum) 

### Valor de retorno

O tamanho máximo de alocação suportado. 

### Veja também

[ max_size](<#/doc/memory/allocator_traits/max_size>)[static] | retorna o tamanho máximo de objeto suportado pelo allocator   
  (função membro estática pública de `std::allocator_traits<Alloc>`)  