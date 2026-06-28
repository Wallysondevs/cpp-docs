# std::move_sentinel

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::semiregular S >
class move_sentinel;
```

`std::move_sentinel` é um adaptador de sentinela usado para denotar ranges juntamente com [std::move_iterator](<#/doc/iterator/move_iterator>).

### Parâmetros de template

- **S** — o tipo da sentinela subjacente

### Funções membro

[ (construtor)](<#/doc/iterator/move_sentinel/move_sentinel>) | constrói um novo `move_sentinel`
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo de um `move_sentinel` a outro
(função membro pública)
[ base](<#/doc/iterator/move_sentinel/base>) | retorna uma cópia da sentinela subjacente
(função membro pública)

### Objetos membro

Nome do membro | Definição
---|---
`_last_` (private) | sentinela subjacente
(objeto membro apenas para exposição*)

### Funções não-membro

[ operator==(std::move_sentinel)](<#/doc/iterator/move_iterator/operator_cmp2>)(C++20) | compara o iterator subjacente e a sentinela subjacente
(template de função)
[ operator-(std::move_sentinel)](<#/doc/iterator/move_iterator/operator-2>)(C++20) | calcula a distância entre o iterator subjacente e a sentinela subjacente
(template de função)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ move_iterator](<#/doc/iterator/move_iterator>)(C++11) | adaptador de iterator que desreferencia para um rvalue
(template de classe)