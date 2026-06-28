# std::auto_ptr&lt;T&gt;::reset

```cpp
void reset( T* p = 0 ) throw();
```
| | (obsoleto desde C++11)
(removido em C++17)

Substitui o ponteiro gerenciado por p. Se o ponteiro atualmente gerenciado não for um ponteiro nulo, `delete get()` é chamado.

### Parâmetros

- **p** — um ponteiro para um objeto a ser gerenciado

### Valor de retorno

(nenhum)

### Veja também

[ release](<#/doc/memory/auto_ptr/release>) | libera a posse do objeto gerenciado
(função membro pública)