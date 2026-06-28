# std::undeclare_reachable

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
T* undeclare_reachable( T* p );
(removido em C++23)
```

Remove o status de alcançável do objeto, referenciado pelo ponteiro p, se ele foi previamente definido por [std::declare_reachable](<#/doc/memory/gc/declare_reachable>). Se o objeto foi declarado alcançável múltiplas vezes, o mesmo número de chamadas a `undeclare_reachable` seria necessário para remover este status. Uma vez que o objeto não é declarado alcançável e não possui ponteiros referenciando-o, ele pode ser recuperado pelo coletor de lixo ou reportado como um vazamento por um detector de vazamentos.

### Parâmetros

- **p** — um ponteiro para um objeto previamente declarado alcançável e não destruído desde então

### Valor de retorno

Uma cópia de p derivada com segurança.

### Exceções

Não lança exceções.

### Veja também

[ declare_reachable](<#/doc/memory/gc/declare_reachable>)(C++11)(removido em C++23) | declara que um objeto não pode ser reciclado
(função)