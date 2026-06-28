# std::declare_no_pointers

Definido no cabeçalho `<memory>`

```c
void declare_no_pointers( char *p, std::size_t n );
(removido em C++23)
```

Informa ao coletor de lixo ou detector de vazamento que a região de memória especificada (n bytes começando no byte apontado por p) não contém ponteiros rastreáveis. Se qualquer parte da região estiver dentro de um objeto alocado, a região inteira deve estar contida no mesmo objeto.

### Parâmetros

- **p** — ponteiro para o início do range
- **n** — o número de bytes no range

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Veja também

[ undeclare_no_pointers](<#/doc/memory/gc/undeclare_no_pointers>)(C++11)(removido em C++23) | cancela o efeito de **std::declare_no_pointers**
(função)