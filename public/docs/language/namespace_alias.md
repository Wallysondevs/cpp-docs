# Aliases de namespace

Aliases de namespace permitem ao programador definir um nome alternativo para um namespace.

Eles são comumente usados como um atalho conveniente para namespaces longos ou profundamente aninhados.

### Sintaxe

---
`namespace` alias_name = ns_name`;` | (1) |
---|---|---
`namespace` alias_name = `::` ns_name`;` | (2) |
`namespace` alias_name = nested_name`::` ns_name`;` | (3) |

### Explicação

O novo alias alias_name fornece um método alternativo de acesso a ns_name.

alias_name deve ser um nome não utilizado anteriormente. alias_name é válido pela duração do escopo no qual é introduzido.

### Palavras-chave

[`namespace`](<#/doc/keyword/namespace>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    namespace foo
    {
        namespace bar
        {
             namespace baz
             {
                 int qux = 42;
             }
        }
    }
    
    namespace fbz = foo::bar::baz;
    
    int main()
    {
        std::cout << fbz::qux << '\n';
    }
```

Saída:
```
    42
```

### Veja também

[ declaração de namespace ](<#/doc/language/namespace>) | identifica um namespace
---|---
[ declaração de alias de tipo ](<#/doc/language/type_alias>)(C++11) | cria um sinônimo para um tipo