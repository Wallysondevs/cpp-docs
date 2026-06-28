# std::error_code::assign

```cpp
void assign( int val, const error_category& cat ) noexcept;
```
| | (desde C++11)

Substitui o conteúdo com o valor do código de erro `val` e a categoria correspondente `cat`.

### Parâmetros

- **val** — valor do código de erro dependente da plataforma a ser atribuído
- **cat** — categoria de erro correspondente a `val`

### Valor de retorno

(nenhum)

### Veja também

[ operator=](<#/>) | atribui outro código de erro
(função membro pública)