# std::assume_aligned

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< std::size_t N, class T >
constexpr T* assume_aligned( T* ptr );
```

Informa à implementação que o objeto para o qual `ptr` aponta está alinhado a pelo menos `N`. A implementação pode usar esta informação para gerar código mais eficiente, mas pode fazer essa suposição apenas se o objeto for acessado através do valor de retorno de `assume_aligned`.

`N` deve ser uma potência de 2. O comportamento é indefinido se `ptr` não apontar para um objeto do tipo `T` (ignorando a qualificação cv em todos os níveis), ou se o alinhamento do objeto não for de pelo menos `N`.

### Valor de retorno

`ptr`.

### Exceções

Não lança exceções.

### Notas

Para garantir que o programa se beneficie das otimizações habilitadas por `assume_aligned`, é importante acessar o objeto através do seu valor de retorno:
```cpp
    void f(int* p)
    {
        int* p1 = std::assume_aligned<256>(p);
        // Use p1, não p, para garantir o benefício da suposição de alinhamento.
        // No entanto, o programa tem comportamento indefinido se p não estiver alinhado
        // independentemente de p1 ser usado.
    }
```

Cabe ao programa garantir que a suposição de alinhamento seja realmente válida. Uma chamada para `assume_aligned` não faz com que o compilador verifique ou imponha isso.

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_assume_aligned`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | `std::assume_aligned`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo
(operador)
`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica
(especificador)
[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de um determinado tamanho
(modelo de classe)
[ align](<#/doc/memory/align>)(C++11) | alinha um ponteiro em um buffer
(função)
`[[[assume](<#/doc/language/attributes/assume>)(_expression_)]]`(C++23) | especifica que a _expression_ sempre será avaliada como verdadeira em um determinado ponto
(especificador de atributo)