# std::experimental::reflect::ConversionOperator

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept ConversionOperator = Operator<T> && MemberFunction<T> && /* see below */;
```

O concept `ConversionOperator` é satisfeito se e somente se T reflete uma função de conversão.

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização