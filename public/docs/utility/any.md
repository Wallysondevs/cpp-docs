# std::any

Definido no cabeçalho `[<any>](<#/doc/header/any>)`

```c
class any;
```

A classe `any` descreve um container type-safe para valores únicos de qualquer tipo [copy constructible](<#/doc/types/is_copy_constructible>).

1) Um objeto da classe `any` armazena uma instância de qualquer tipo que satisfaça os requisitos do construtor ou está vazio, e isso é referido como o _estado_ do objeto da classe `any`. A instância armazenada é chamada de objeto contido. Dois estados são equivalentes se ambos estiverem vazios ou se ambos não estiverem vazios e se os objetos contidos forem equivalentes.

2) As funções `any_cast` não-membro fornecem acesso type-safe ao objeto contido.

As implementações são encorajadas a evitar alocações dinâmicas para objetos pequenos, mas tal otimização só pode ser aplicada a tipos para os quais [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>) retorna `true`.

### Funções membro

[ (construtor)](<#/doc/utility/any/any>) | constrói um objeto `any`
(função membro pública)
[ operator=](<#/>) | atribui um objeto `any`
(função membro pública)
[ (destrutor)](<#/doc/utility/any/~any>) | destrói um objeto `any`
(função membro pública)

##### Modificadores

[ emplace](<#/doc/utility/any/emplace>) | altera o objeto contido, construindo o novo objeto diretamente
(função membro pública)
[ reset](<#/doc/utility/any/reset>) | destrói o objeto contido
(função membro pública)
[ swap](<#/doc/utility/any/swap>) | troca dois objetos `any`
(função membro pública)

##### Observadores

[ has_value](<#/doc/utility/any/has_value>) | verifica se o objeto contém um valor
(função membro pública)
[ type](<#/doc/utility/any/type>) | retorna o `typeid` do valor contido
(função membro pública)

### Funções não-membro

[ std::swap(std::any)](<#/doc/utility/any/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ any_cast](<#/doc/utility/any/any_cast>)(C++17) | acesso type-safe ao objeto contido
(modelo de função)
[ make_any](<#/doc/utility/any/make_any>)(C++17) | cria um objeto `any`
(modelo de função)

### Classes auxiliares

[ bad_any_cast](<#/doc/utility/any/bad_any_cast>)(C++17) | exceção lançada pelas formas de `any_cast` que retornam valor em caso de incompatibilidade de tipo
(classe)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_any`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | [`std::any`](<#/doc/utility/any>)

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        // any type
        std::any a = 1;
        std::cout << a.type().name() << ": " << std::any_cast<int>(a) << '\n';
        a = 3.14;
        std::cout << a.type().name() << ": " << std::any_cast<double>(a) << '\n';
        a = true;
        std::cout << a.type().name() << ": " << std::any_cast<bool>(a) << '\n';
    
        // bad cast
        try
        {
            a = 1;
            std::cout << std::any_cast<float>(a) << '\n';
        }
        catch (const std::bad_any_cast& e)
        {
            std::cout << e.what() << '\n';
        }
    
        // has value
        a = 2;
        if (a.has_value())
            std::cout << a.type().name() << ": " << std::any_cast<int>(a) << '\n';
    
        // reset
        a.reset();
        if (!a.has_value())
            std::cout << "no value\n";
    
        // pointer to contained data
        a = 3;
        int* i = std::any_cast<int>(&a);
        std::cout << *i << '\n';
    }
```

Saída possível:
```
    int: 1
    double: 3.14
    bool: true
    bad any_cast
    int: 2
    no value
    3
```

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto invocável copy constructible
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto invocável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ variant](<#/doc/utility/variant>)(C++17) | uma união discriminada type-safe
(modelo de classe)
[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(modelo de classe)