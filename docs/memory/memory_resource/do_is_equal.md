# std::pmr::memory_resource::do_is_equal

```cpp
virtual bool do_is_equal( const std::pmr::memory_resource& other ) const noexcept = 0;  // (desde C++17)
```

Compara *this por igualdade com other.

Duas `memory_resource`s são consideradas iguais se e somente se a memória alocada de uma `memory_resource` puder ser desalocada da outra e vice-versa.

### Notas

O tipo mais derivado de other pode não corresponder ao tipo mais derivado de *this. Uma implementação de classe derivada, portanto, deve tipicamente verificar se os tipos mais derivados de *this e other correspondem usando [`dynamic_cast`](<#/doc/language/dynamic_cast>), e retornar false imediatamente se a conversão falhar.

### Veja também

[ is_equal](<#/doc/memory/memory_resource/is_equal>) | compara por igualdade com outra `memory_resource`
(função membro pública)