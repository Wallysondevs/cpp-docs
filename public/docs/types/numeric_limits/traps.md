# std::numeric_limits&lt;T&gt;::traps

```cpp
static const bool traps;  // (até C++11)
static constexpr bool traps;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::traps é `true` para todos os tipos aritméticos `T` que possuem pelo menos um valor no início do programa que, se usado como argumento para uma operação aritmética, gerará uma [trap](<https://en.wikipedia.org/wiki/Trap_\(computing\)> "enwiki:Trap \(computing\)").

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::traps  
---|---
/* não especializado */ |  false  
bool |  false  
char |  geralmente true  
signed char |  geralmente true  
unsigned char |  geralmente true  
wchar_t |  geralmente true  
char8_t (desde C++20) |  geralmente true  
char16_t (desde C++11) |  geralmente true  
char32_t (desde C++11) |  geralmente true  
short |  geralmente true  
unsigned short |  geralmente true  
int |  geralmente true  
unsigned int |  geralmente true  
long |  geralmente true  
unsigned long |  geralmente true  
long long (desde C++11) |  geralmente true  
unsigned long long (desde C++11) |  geralmente true  
float |  geralmente false  
double |  geralmente false  
long double |  geralmente false  
  
### Notas

Na maioria das plataformas, a divisão inteira por zero sempre gera uma trap, e [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::traps é `true` para todos os tipos inteiros que suportam o valor `0`. A exceção é o tipo `bool`: embora a divisão por `false` gere uma trap devido à promoção integral de `bool` para `int`, é o `int` com valor zero que gera a trap. Zero não é um valor do tipo `bool`.

Na maioria das plataformas, exceções de ponto flutuante podem ser ativadas e desativadas em tempo de execução (por exemplo, `feenableexcept()` no Linux ou `_controlfp` no Windows), caso em que o valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::traps para tipos de ponto flutuante reflete o estado da facilidade de trapping de ponto flutuante no momento da inicialização do programa, que é `false` na maioria dos sistemas modernos. Uma exceção seria um programa [DEC Alpha](<https://en.wikipedia.org/wiki/DEC_Alpha> "enwiki:DEC Alpha"), onde é `true` se compilado sem `-ieee`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <limits>
     
    int main()
    {
        std::cout << std::boolalpha
                  << "bool:     traps = " << std::numeric_limits<bool>::traps << '\n'
                  << "char:     traps = " << std::numeric_limits<char>::traps << '\n'
                  << "char16_t: traps = " << std::numeric_limits<char16_t>::traps << '\n'
                  << "long:     traps = " << std::numeric_limits<long>::traps << '\n'
                  << "float:    traps = " << std::numeric_limits<float>::traps << '\n';
    }
```

Saída possível:
```
    // GCC output:
    bool:     traps = true
    char:     traps = true
    char16_t: traps = true
    long:     traps = true
    float:    traps = false
     
    // Clang output:
    bool:     traps = false
    char:     traps = true
    char16_t: traps = true
    long:     traps = true
    float:    traps = false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 497](<https://cplusplus.github.io/LWG/issue497>) | C++98  | não estava claro o que é retornado se o trapping  
é ativado ou desativado em tempo de execução  | retorna o status de ativação  
no início do programa   
  
### Veja também

[Floating-point environment](<#/doc/numeric/fenv>)  
---  
[ tinyness_before](<#/doc/types/numeric_limits/tinyness_before>)[static] |  identifica tipos de ponto flutuante que detectam "tinyness" antes do arredondamento   
(constante membro estática pública)  
[ has_denorm_loss](<#/doc/types/numeric_limits/has_denorm_loss>)[static] |  identifica os tipos de ponto flutuante que detectam perda de precisão como perda por desnormalização em vez de resultado inexato   
(constante membro estática pública)