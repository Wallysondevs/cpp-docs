# std::bad_array_new_length

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
class bad_array_new_length;
```

`std::bad_array_new_length` é o tipo do objeto lançado como exceção pelas [new-expressions](<#/doc/language/new>) para reportar comprimentos de array inválidos se

1.  O comprimento do array é negativo,
2.  O tamanho total do novo array excederia o valor máximo definido pela implementação,
3.  O número de cláusulas de inicialização excede o número de elementos a serem inicializados.

Apenas a primeira dimensão do array pode gerar esta exceção; dimensões diferentes da primeira são expressões constantes e são verificadas em tempo de compilação.

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `bad_array_new_length`
(função membro pública)
operator= | substitui o objeto `bad_array_new_length`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_array_new_length::bad_array_new_length

```cpp
bad_array_new_length() noexcept;  // (1) (desde C++11)
bad_array_new_length( const bad_array_new_length& other ) noexcept;  // (2) (desde C++11)
```

Constrói um novo objeto `bad_array_new_length` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_array_new_length` então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_array_new_length::operator=

```cpp
bad_array_new_length& operator=( const bad_array_new_length& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_array_new_length` então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_array_new_length::what

```cpp
virtual const char* what() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até o objeto de exceção do qual ele é obtido ser destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal comum durante a avaliação constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [ std::bad_alloc](<#/doc/memory/new/bad_alloc>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Três condições onde `std::bad_array_new_length` deve ser lançada:

Execute este código
```cpp
    #include <climits>
    #include <iostream>
    #include <new>
    
    int main()
    {
        try
        {
            int negative = -1;
            new int[negative];
        }
        catch (const std::bad_array_new_length& e)
        {
            std::cout << "1) " << e.what() << ": negative size\n";
        }
    
        try
        {
            int small = 1;
            new int[small]{1,2,3};
        }
        catch (const std::bad_array_new_length& e)
        {
            std::cout << "2) " << e.what() << ": too many initializers\n";
        }
    
        try
        {
            long large = LONG_MAX;
            new int[large][1000];
        } 
        catch (const std::bad_array_new_length& e)
        {
            std::cout << "3) " << e.what() << ": too large\n";
        }
    
        std::cout << "End\n";
    }
```

Saída possível:
```
    1) std::bad_array_new_length: negative size
    2) std::bad_array_new_length: too many initializers
    3) std::bad_array_new_length: too large
    End
```

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ bad_alloc](<#/doc/memory/new/bad_alloc>) | exceção lançada quando a alocação de memória falha
(classe)