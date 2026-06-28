# Identificador C++ com significado especial: override (desde C++11)

### Uso

  * [`override`](<#/doc/language/override>) especificador

### Exemplo
```cpp
    struct b
    {
        void f0() {};
        void f1() {};
        virtual void f2() {};
        virtual void f3() {};
        virtual void f4() {};
        virtual void f5() {};
    };
     
    struct d : b
    {
        void f0() {};                        // OK. Nem b::f0 nem d::f0 são virtuais.
        void f1() override {};               // Erro: não é possível sobrescrever a função não virtual b::f1.
        void f2() override {};               // OK. A função membro d::f2 é virtual.
        virtual void f3() {};                // OK. O especificador 'override' é opcional.
        virtual void f4() override {};       // OK. 'override' garante que b::f4 é virtual.
        virtual void f5() override final {}; // OK. d::f5 é tanto sobrescrita quanto final.
    };
```

### Veja também

  * [`virtual`](<#/doc/keyword/virtual>), [`final`](<#/doc/identifier_with_special_meaning/final>)
