# std::copyable_function::swap

```cpp
void swap( copyable_function& other ) noexcept;
```
| | | (desde C++26)

Troca os objetos invocáveis (callable objects) armazenados de `*this` e `other`.

### Parâmetros

- **other** — wrapper de função para trocar o objeto invocável armazenado com

### Valor de retorno

(nenhum)

### Veja também

[ swap](<#/doc/utility/functional/function/swap>) | troca os conteúdos
(função membro pública de `std::function<R(Args...)>`)
[ swap](<#/doc/utility/functional/move_only_function/swap>) | troca os alvos de dois objetos `std::move_only_function`
(função membro pública de `std::move_only_function`)