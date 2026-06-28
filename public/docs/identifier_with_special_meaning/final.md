# Identificador C++ com significado especial: final (desde C++11)

### Uso  
  
  * [`final`](<#/doc/language/final>) especificador 

### Exemplo
```cpp 
    struct b0 final {};
    struct d0 : b0 {}; // Erro: não é possível derivar de uma base final
     
    struct b1
    {
        virtual void f0() final;
        virtual void f1();
    };
     
    struct d1 : b1 // OK
    {
        void f0(); // Erro: não é possível sobrescrever uma função final
        void f1(); // OK
    };
```

### Ver também

  * [`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>), [`union`](<#/doc/keyword/union>)
  * [`virtual`](<#/doc/keyword/virtual>), [`override`](<#/doc/identifier_with_special_meaning/override>)
