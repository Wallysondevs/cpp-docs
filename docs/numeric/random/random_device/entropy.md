# std::random_device::entropy

```cpp
double entropy() const noexcept;  // (desde C++11)
```

  
Obtém uma estimativa da entropia do dispositivo de números aleatórios, que é um valor de ponto flutuante entre 0 e log2(max()+1) (que é igual a [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned int&gt;::digits). Se o dispositivo possui n estados cujas probabilidades individuais são P0,...,Pn-1, a entropia do dispositivo S é definida como 

S = −∑n-1  
i=0 Pilog(Pi)

Um gerador de números aleatórios determinístico (por exemplo, um engine pseudoaleatório) tem entropia zero. 

### Valor de retorno

O valor da entropia do dispositivo, ou zero se não aplicável. 

### Notas

Esta função não está totalmente implementada em algumas standard libraries. Por exemplo, [LLVM libc++](<https://github.com/llvm-mirror/libcxx/blob/master/src/random.cpp#L174>) antes da versão 12 sempre retorna zero, mesmo que o dispositivo seja não-determinístico. Em comparação, a implementação do Microsoft Visual C++ sempre retorna 32, e [boost.random](<https://github.com/boostorg/random/blob/master/src/random_device.cpp#L242>) retorna 10. 

A entropia do dispositivo do kernel Linux `/dev/urandom` pode ser obtida usando [`ioctl RNDGETENTCNT`](<https://man7.org/linux/man-pages/man4/random.4.html>) — é isso que `std::random_device::entropy()` em [GNU libstdc++](<https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/src/c%2B%2B11/random.cc#L188>) usa a partir da versão 8.1. 

### Exemplo

Saída de exemplo em uma das implementações

Execute este código
```cpp 
    #include <iostream>
    #include <random>
     
    int main()
    {
        std::random_device rd;
        std::cout << rd.entropy() << '\n';
    }
```

Saída possível: 
```
    32
```