# std::experimental::filesystem::recursive_directory_iterator::operator*, std::experimental::filesystem::recursive_directory_iterator::operator->

const directory_entry& operator*() const; | (1) | (filesystem TS)
---|---|---
const directory_entry* operator->() const; | (2) | (filesystem TS)

Acessa o [`directory_entry`](<#/doc/experimental/fs/directory_entry>) apontado.

O resultado de `operator*` ou `operator->` no iterador final é comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

1) Valor do [`directory_entry`](<#/doc/experimental/fs/directory_entry>) referenciado por este iterador.

2) Ponteiro para o [`directory_entry`](<#/doc/experimental/fs/directory_entry>) referenciado por este iterador.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ operator*operator->](<#/doc/experimental/fs/directory_iterator/operator_star_>) | acessa a entrada apontada
(função membro pública de `std::experimental::filesystem::directory_iterator`)