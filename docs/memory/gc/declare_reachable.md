# std::declare_reachable

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
void declare_reachable( void* p );
(removido em C++23)
```

Declara o objeto referenciado pelo ponteiro p como alcançável. Objetos alcançáveis não serão excluídos pelo coletor de lixo ou considerados um vazamento por um detector de vazamentos, mesmo que todos os ponteiros para ele sejam destruídos. Um objeto pode ser declarado alcançável múltiplas vezes, caso em que múltiplas chamadas para [std::undeclare_reachable](<#/doc/memory/gc/undeclare_reachable>) seriam necessárias para remover esta propriedade. Por exemplo, uma [lista ligada XOR](<https://en.wikipedia.org/wiki/XOR_linked_list> "enwiki:XOR linked list") precisa declarar seus nós como alcançáveis se a implementação tiver coleta de lixo habilitada.

### Parâmetros

- **p** — um ponteiro derivado com segurança ou um ponteiro nulo

### Valor de retorno

(nenhum)

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se o sistema não conseguir alocar a memória necessária para rastrear objetos alcançáveis.

### Veja também

[ undeclare_reachable](<#/doc/memory/gc/undeclare_reachable>)(C++11)(removido em C++23) | declara que um objeto pode ser reciclado
(modelo de função)