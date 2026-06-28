# std::undeclare_no_pointers

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
void undeclare_no_pointers( char *p, std::size_t n );
(removido em C++23)
```

Desregistra um range previamente registrado com [std::declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)().

### Parâmetros

- **p** — ponteiro para o início do range previamente registrado com [std::declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)
- **n** — o número de bytes no range, o mesmo valor usado anteriormente com [std::declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Veja também

[ declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)(C++11)(removido em C++23) | declara que uma área de memória não contém ponteiros rastreáveis
(função)