# std::filesystem::directory_iterator::operator*, std::filesystem::directory_iterator::operator->

```cpp
const std::filesystem::directory_entry& operator*() const;  // (1) (desde C++17)
const std::filesystem::directory_entry* operator->() const;  // (2) (desde C++17)
```

  
Acessa o [`directory_entry`](<#/doc/filesystem/directory_entry>) apontado.

O resultado de `operator*` ou `operator->` em um iterator de fim é comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

1) Valor do [`directory_entry`](<#/doc/filesystem/directory_entry>) referenciado por este iterator.

2) Ponteiro para o [`directory_entry`](<#/doc/filesystem/directory_entry>) referenciado por este iterator.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ operator*operator->](<#/doc/filesystem/recursive_directory_iterator/operator_star_>) | acessa a entrada apontada   
(função membro pública de `std::filesystem::recursive_directory_iterator`)  