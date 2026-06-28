# std::ios_base::precision

```cpp
streamsize precision() const;  // (1)
streamsize precision( streamsize new_precision );  // (2)
```

Gerencia a precisão (ou seja, quantos dígitos são gerados) da saída de ponto flutuante realizada por [std::num_put::do_put](<#/doc/locale/num_put/put>).

1) Retorna a precisão atual.

2) Define a precisão para a fornecida. Retorna a precisão anterior.

A precisão padrão, conforme estabelecido por [std::basic_ios::init](<#/doc/io/basic_ios/init>), é 6.

### Parâmetros

- **new_precision** — nova configuração de precisão

### Valor de retorno

A precisão antes da chamada da função

### Exemplo

Execute este código
```
    #include <iostream>
    
    int main()
    {
        const double d = 12.345678901234;
        std::cout << "The  default precision is " << std::cout.precision() << "\n\n";
        std::cout << "With default precision d is " << d << '\n';
        std::cout.precision(8);
        std::cout << "With high    precision d is " << d << '\n';
    }
```

Saída:
```
    The  default precision is 6
    
    With default precision d is 12.3457
    With high    precision d is 12.345679
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 189](<https://cplusplus.github.io/LWG/issue189>) | C++98 | 'precision' foi definida como 'o número de dígitos após
o ponto decimal', mas não está correto em alguns casos | corrigido

### Veja também

[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública)
[ setprecision](<#/doc/io/manip/setprecision>) | altera a precisão de ponto flutuante
(função)