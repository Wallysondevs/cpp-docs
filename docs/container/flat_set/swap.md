# std::flat_set&lt;Key,Compare,KeyContainer&gt;::swap

```cpp
void swap( flat_set& other ) noexcept;  // (desde C++23)
```

Troca o conteúdo do adaptador de container com o de `other`. Efetivamente chama
```
    ranges::swap(compare, other.compare);
    ranges::swap(c, other.c);
```

### Parâmetros

- **other** — adaptador de container para trocar o conteúdo com

### Valor de retorno

(nenhum)

### Exceções

(nenhuma)

### Complexidade

Mesma que a do container subjacente (tipicamente constante).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ std::swap(std::flat_set)](<#/doc/container/flat_set/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)