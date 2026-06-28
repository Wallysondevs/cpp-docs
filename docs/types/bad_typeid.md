# std::bad_typeid

Definido no cabeçalho `[<typeinfo>](<#/doc/header/typeinfo>)`

```c
class bad_typeid : public std::exception;
```

Uma exceção deste tipo é lançada quando um operador [`typeid`](<#/doc/language/typeid>) é aplicado a um valor de ponteiro nulo desreferenciado de um tipo polimórfico.

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `bad_typeid`
(função membro pública)
operator= | substitui o objeto `bad_typeid`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_typeid::bad_typeid

```cpp
  // (1)
bad_typeid() throw();  // (até C++11)
bad_typeid() noexcept;  // (desde C++11)
  // (2)
bad_typeid( const bad_typeid& other ) throw();  // (até C++11)
bad_typeid( const bad_typeid& other ) noexcept;  // (desde C++11)
```

Constrói um novo objeto `bad_typeid` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_typeid`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.(desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_typeid::operator=

```cpp
bad_typeid& operator=( const bad_typeid& other ) throw();  // (até C++11)
bad_typeid& operator=( const bad_typeid& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_typeid`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.(desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_typeid::what

```cpp
virtual const char* what() const throw();  // (até C++11)
virtual const char* what() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) seja chamada no objeto de exceção.

A string retornada é codificada com a codificação literal comum durante a avaliação constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <typeinfo>
     
    struct S // The type has to be polymorphic
    {
        virtual void f();
    }; 
     
    int main()
    {
        S* p = nullptr;
        try
        {
            std::cout << typeid(*p).name() << '\n';
        }
        catch (const std::bad_typeid& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Attempted a typeid of NULL pointer!
```