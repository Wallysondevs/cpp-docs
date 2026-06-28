# std::make_exception_ptr

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
template< class E >
std::exception_ptr make_exception_ptr( E e ) noexcept;
(constexpr desde C++26)
```

Cria um [std::exception_ptr](<#/doc/error/exception_ptr>) que mantém uma referência a uma cópia de e. Isso é feito como se executasse o seguinte código:
```cpp
    try
    {
        throw e;
    }
    catch(...)
    {
        return std::current_exception();
    }
```

### Parâmetros

e | \- | objeto de exceção para criar uma referência à cópia de

### Valor de retorno

Uma instância de [std::exception_ptr](<#/doc/error/exception_ptr>) mantendo uma referência à cópia de e, ou a uma instância de [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou a uma instância de [std::bad_exception](<#/doc/error/bad_exception>) (veja [std::current_exception](<#/doc/error/current_exception>)).

### Notas

O parâmetro é passado por valor e está sujeito a slicing.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)