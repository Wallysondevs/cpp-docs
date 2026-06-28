# std::bad_alloc

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
class bad_alloc;
```

`std::bad_alloc` é o tipo do objeto lançado como exceção pelas [funções de alocação](<#/doc/memory/new/operator_new>) para reportar falha na alocação de armazenamento.

Diagrama de Herança

### Funções membro

(construtor) | constrói um novo objeto `bad_alloc`
(função membro pública)
operator= | substitui o objeto `bad_alloc`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_alloc::bad_alloc

```cpp
  // (1)
bad_alloc() throw();  // (até C++11)
bad_alloc() noexcept;  // (desde C++11)
  // (2)
bad_alloc( const bad_alloc& other ) throw();  // (até C++11)
bad_alloc( const bad_alloc& other ) noexcept;  // (desde C++11)
```

Constrói um novo objeto `bad_alloc` com uma string de bytes terminada em nulo, definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_alloc`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. (desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_alloc::operator=

```cpp
bad_alloc& operator=( const bad_alloc& other ) throw();  // (até C++11)
bad_alloc& operator=( const bad_alloc& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_alloc`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. (desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_alloc::what

```cpp
virtual const char* what() const throw();  // (até C++11)
virtual const char* what() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo, definida pela implementação, com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal ordinária durante a avaliação constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <new>
    
    int main()
    {
        try
        {
            while (true)
            {
                new int[100000000ul];
            }
        }
        catch (const std::bad_alloc& e)
        {
            std::cout << "Allocation failed: " << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Allocation failed: std::bad_alloc
```

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)