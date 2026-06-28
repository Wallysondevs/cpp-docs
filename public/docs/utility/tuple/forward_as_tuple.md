# std::forward_as_tuple

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... Types >
std::tuple<Types&&...> forward_as_tuple( Types&&... args ) noexcept;
(constexpr desde C++14)
```

Constrói uma tuple de referências para os argumentos em args adequada para encaminhamento como um argumento para uma função. A tuple possui membros de dados de referência rvalue quando rvalues são usados como argumentos, e caso contrário, possui membros de dados de referência lvalue.

### Parâmetros

- **args** — zero ou mais argumentos para construir a tuple a partir deles

### Valor de retorno

Um objeto [std::tuple](<#/doc/utility/tuple>) criado como se por [std::tuple](<#/doc/utility/tuple>)<Types&&...>([std::forward](<#/doc/utility/forward>)&lt;Types&gt;(args)...)

### Observações

Se os argumentos forem temporários, `forward_as_tuple` não estende sua lifetime; eles devem ser usados antes do final da expressão completa.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <string>
    #include <tuple>
     
    int main()
    {
        std::map<int, std::string> m;
     
        m.emplace(std::piecewise_construct,
                  std::forward_as_tuple(6),
                  std::forward_as_tuple(9, 'g'));
        std::cout << "m[6] = " << m[6] << '\n';
     
        // O seguinte é um erro: ele produz uma
        // std::tuple<int&&, char&&> contendo duas referências pendentes.
        //
        // auto t = std::forward_as_tuple(20, 'a');
        // m.emplace(std::piecewise_construct, std::forward_as_tuple(10), t);
    }
```

Saída:
```
    m[6] = ggggggggg
```

### Veja também

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuples
(modelo de função)
[ apply](<#/doc/utility/apply>)(C++17) | chama uma função com uma tuple de argumentos
(modelo de função)