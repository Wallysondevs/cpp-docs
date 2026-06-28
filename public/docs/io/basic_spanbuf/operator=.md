# std::basic_spanbuf&lt;CharT,Traits&gt;::operator=

```cpp
basic_spanbuf& operator=( basic_spanbuf&& rhs );  // (1) (desde C++23)
basic_spanbuf& operator( const basic_spanbuf& ) = delete;  // (2) (desde C++23)
```

1) Operador de atribuição por movimento. Equivalente a `auto tmp{std::move(rhs)}; this->swap(tmp); return *this;`. Após a atribuição por movimento, `*this` mantém o estado que `rhs` possuía antes da atribuição por movimento. É definido pela implementação se `rhs` ainda mantém o buffer subjacente após a atribuição por movimento.

2) O operador de atribuição por cópia é deletado; `basic_spanbuf` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

- **rhs** — outro `basic_spanbuf` do qual o conteúdo será movido

### Valor de retorno

`*this`

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (constructor)](<#/doc/io/basic_spanbuf/basic_spanbuf>) | constrói um objeto `basic_spanbuf`
(função membro pública)
[ swap](<#/doc/io/basic_spanbuf/swap>) | troca dois objetos `basic_spanbuf`
(função membro pública)