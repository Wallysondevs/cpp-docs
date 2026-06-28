# std::bad_cast

Definido no cabeçalho `[<typeinfo>](<#/doc/header/typeinfo>)`

```c
class bad_cast : public std::exception;
```

Uma exceção deste tipo é lançada quando um [`dynamic_cast`](<#/doc/language/dynamic_cast>) para um tipo de referência falha na verificação em tempo de execução (por exemplo, porque os tipos não estão relacionados por herança), e também de [std::use_facet](<#/doc/locale/use_facet>) se o facet solicitado não existir na locale.

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `bad_cast`
(função membro pública)
operator= | substitui o objeto `bad_cast`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_cast::bad_cast

```cpp
  // (1)
bad_cast() throw();  // (até C++11)
bad_cast() noexcept;  // (desde C++11)
  // (2)
bad_cast( const bad_cast& other ) throw();  // (até C++11)
bad_cast( const bad_cast& other ) noexcept;  // (desde C++11)
```

Constrói um novo objeto `bad_cast` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. (desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_cast::operator=

```cpp
bad_cast& operator=( const bad_cast& other ) throw();  // (até C++11)
bad_cast& operator=( const bad_cast& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. (desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_cast::what

```cpp
virtual const char* what() const throw();  // (até C++11)
virtual const char* what() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) seja chamada no objeto de exceção.

A string retornada é codificada com a codificação literal comum durante a avaliação em tempo de compilação. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
`__cpp_lib_constexpr_exceptions` | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Execute este código
```
    #include <iostream>
    #include <typeinfo>
    
    struct Foo { virtual ~Foo() {} };
    struct Bar { virtual ~Bar() { std::cout << "~Bar\n"; } };
    struct Pub : Bar { ~Pub() override { std::cout << "~Pub\n"; } };
    
    int main()
    {
        Pub pub;
        try
        {
            [[maybe_unused]]
            Bar& r1 = dynamic_cast<Bar&>(pub); // OK, upcast
    
            [[maybe_unused]]
            Foo& r2 = dynamic_cast<Foo&>(pub); // throws
        }
        catch (const std::bad_cast& e)
        {
            std::cout << "e.what(): " << e.what() << '\n';
        }
    }
```

Saída possível:
```
    e.what(): std::bad_cast
    ~Pub
    ~Bar
```