# std::experimental::filesystem::directory_iterator::operator*,operator->

const directory_entry& operator*() const;  
  
const directory_entry* operator->() const; |  |  (filesystem TS)  

  
Acessa o [`directory_entry`](<#/doc/experimental/fs/directory_entry>) apontado.

O resultado de `operator*` ou `operator->` no iterator final é comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

1) Valor do [`directory_entry`](<#/doc/experimental/fs/directory_entry>) referenciado por este iterator.

2) Ponteiro para o [`directory_entry`](<#/doc/experimental/fs/directory_entry>) referenciado por este iterator.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ operator*operator->](<#/doc/experimental/fs/recursive_directory_iterator/operator_star_>) | acessa a entrada apontada   
(função membro pública de `std::experimental::filesystem::recursive_directory_iterator`)  